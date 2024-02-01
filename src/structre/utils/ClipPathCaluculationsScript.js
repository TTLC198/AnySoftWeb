export function coordinatesOfBlock(pointA, pointB, offset, angle) {
    const [xA, yA] = pointA;
    const [xB, yB] = pointB;
    const directionVector = new Vector(1, Math.tan(angle));

    const refPoints = {
        leftTop: new Point(xA, yA),
        rightTop: new Point(xB, yA),
        leftBottom: new Point(xA, yB),
        rightBottom: new Point(xB, yB)
    };

    const refLines = {
        top: new Line("twoPoints", {
            M1: refPoints.leftTop,
            M2: refPoints.rightTop
        }),
        right: new Line("twoPoints", {
            M1: refPoints.rightTop,
            M2: refPoints.rightBottom
        }),
        bottom: new Line("twoPoints", {
            M1: refPoints.leftBottom,
            M2: refPoints.rightBottom
        }),
        left: new Line("twoPoints", {
            M1: refPoints.leftTop,
            M2: refPoints.leftBottom
        })
    };

    const parameters = {
        offset: offset,
        angle: angle,
        vector: directionVector
    };

    let rawCoordinates = calculateCoordinates(refPoints, refLines, parameters);

    let finalCoordinates = [rawCoordinates.leftTop];

    if (Math.trunc(rawCoordinates.leftTop.Y) === Math.trunc(yA) && Math.trunc(rawCoordinates.rightTop.Y) !== Math.trunc(yA))
        finalCoordinates.push(refPoints.rightTop);

    finalCoordinates.push(rawCoordinates.rightTop);
    finalCoordinates.push(rawCoordinates.rightBottom);

    if (Math.trunc(rawCoordinates.rightBottom.Y) === Math.trunc(yB) && Math.trunc(rawCoordinates.leftBottom.Y) !== Math.trunc(yB))
        finalCoordinates.push(refPoints.leftBottom);

    finalCoordinates.push(rawCoordinates.leftBottom);

    return finalCoordinates;
}

export function calculateOffsetForCard(params) {
    return {
        start: params.offset,
        end: params.width * Math.sin(Math.abs(params.angle)) - params.offset + params.height * Math.cos(params.angle)
    }
}

export function calculateOffsetForSwiper(param) {
    return {
        start: param.height * Math.cos(param.angle),
        end: param.width * Math.sin(Math.abs(param.angle))
    }
}

export function calculateOffsetForMainBanner(mode, id, param) {
    const startLine = (param["productLength"] - id - 1) * param.offset;
    const start = param.width * Math.sin(-param.angle) - startLine + param.height * Math.cos(param.angle)
    switch (mode) {
        case "prev":
            return {
                start: start - (start - id * param.offset) * 0.01 * param.time_for_start,
                end: start - (start - id * param.offset) * 0.01 * param.time_for_end + param.offset
            }
        case "next":
            return {
                start: id * param.offset + (start - id * param.offset) * 0.01 * param.time_for_start,
                end: id * param.offset + (start - id * param.offset) * 0.01 * param.time_for_end + param.offset
            }
        case "current":
            return {
                start: start - (start - id * param.offset) * 0.01 * param.time_for_start,
                end: id * param.offset + (start - id * param.offset) * 0.01 * param.time_for_end
            }
        default:
            return null;
    }
}


class Vector {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }
}

class Point {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }

    addOffset(offset, angle) {
        return (
            new Point(
                this.X + offset * Math.abs(Math.sin(angle)),
                this.Y + offset * Math.abs(Math.cos(angle)))
        );
    }

    distance(point) {
        return Math.sqrt(Math.pow(this.X - point.X, 2) + Math.pow(this.Y - point.Y, 2));
    }
}

class Line {
    constructor(mode, parameters) {
        switch (mode) {
            case "normal":
                this.A = parameters.A;
                this.B = parameters.B;
                this.C = parameters.C;
                break;
            case "canonical":
                this.A = parameters.A.Y;
                this.B = -parameters.A.X;
                this.C = (-parameters.A.Y) * parameters.M.X + parameters.A.X * parameters.M.Y;
                break;
            case "twoPoints":
                this.A = parameters.M2.Y - parameters.M1.Y;
                this.B = parameters.M1.X - parameters.M2.X;
                this.C = parameters.M2.X * parameters.M1.Y - parameters.M1.X * parameters.M2.Y;
                break;
            default:
                this.A = 0;
                this.B = 0;
                this.C = 0;
                break;
        }
    }

    intersection(line2) {
        return new Point(
            ((this.B * line2.C - line2.B * this.C) / (this.A * line2.B - line2.A * this.B)),
            ((this.C * line2.A - line2.C * this.A) / (this.A * line2.B - line2.A * this.B))
        );
    }
}


function calculateCoordinates(refPoints, refLines, parameters) {
    let lineStart, lineEnd;
    let leftTop, rightTop, rightBottom, leftBottom;

    lineStart = findLine(refPoints.leftTop, {
        ...parameters,
        offset: parameters.offset.start
    });
    lineEnd = findLine(refPoints.leftTop, {
        ...parameters,
        offset: parameters.offset.end
    });

    leftTop = closestPoint(
        lineStart,
        refLines.top,
        refLines.right,
        refPoints.leftTop
    );

    rightTop = closestPoint(
        lineEnd,
        refLines.top,
        refLines.right,
        refPoints.leftTop
    );

    rightBottom = closestPoint(
        lineEnd,
        refLines.left,
        refLines.bottom,
        refPoints.leftTop
    );

    leftBottom = closestPoint(
        lineStart,
        refLines.left,
        refLines.bottom,
        refPoints.leftTop
    );

    return ({
        leftTop: leftTop,
        rightTop: rightTop,
        rightBottom: rightBottom,
        leftBottom: leftBottom
    })
}

function findLine(startingPoint, param) {
    let pointWithOffset = startingPoint.addOffset(param.offset, param.angle);
    return new Line("canonical", {"A": param.vector, "M": pointWithOffset})
}

function closestPoint(mainLine, firstLine, secondLine, refPoint) {
    let firstPoint = mainLine.intersection(firstLine),
        secondPoint = mainLine.intersection(secondLine);

    if (refPoint.distance(firstPoint) <= refPoint.distance(secondPoint)) {
        return firstPoint;
    } else {
        return secondPoint
    }
}