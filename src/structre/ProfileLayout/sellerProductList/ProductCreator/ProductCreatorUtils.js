import _ from "lodash";

export const fileToBase64 = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(file)
    })
}

export function URLtoFile(url, filename, mimeType) {
    if (url.startsWith('data:')) {
        let arr = url.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        let file = new File([u8arr], filename, {type: mime || mimeType});
        return Promise.resolve(file);
    }
    return fetch(url)
        .then(res => res.arrayBuffer())
        .then(buf => new File([buf], filename, {type: mimeType}));
}

export function getIdList(listWithId, listToFind) {
   return _.compact(listWithId.map((element) => Boolean(_.find(listToFind, ["name", element.name])) ? element.id : null))
}

export function postGenres(genres, productId, instance) {
    genres.forEach(async (genre) => {
        await instance.post("/api/genres", {
            name: genre.name,
            productId: productId
        })
    })
}

export function postProperties(properties, productId, instance) {
    properties.forEach(async (property) => {
        await instance.post("/api/properties", {
            name: property.name,
            productId: productId
        })
    })
}

export function postImages(images, productId, instance) {
    images.forEach(async (image) => {
        await instance.post('/resources/image/upload', {
            productId: productId,
            image: await URLtoFile(image.img, image.name, "image/" + image.name.split(".").slice(-1)[0])
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    })
}

export function deleteGenres(genres, productId, instance) {
    genres.forEach(async (genre) => {
        await instance.delete(`api/genres/delete/${genre}`, {
            params: {
                productId: productId
            }
        })
    })
}
export function deleteProperties(properties, productId, instance) {
    properties.forEach(async (property) => {
        await instance.delete(`api/genres/delete/${property}`, {
            params: {
                productId: productId
            }
        })
    })
}
export async function deleteImages(productId, instance) {
    await instance.delete(`/resources/image/delete`, {
        params: {
            productId: productId
        }
    })
}