export const password_validation = {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'type password ...',
    rules: {
        required: {
            value: true,
            message: 'required',
        },
        minLength: {
            value: 6,
            message: 'min 6 characters',
        },
    },
}
export const repeat_password_validation = {
    name: 'repeat_password',
    label: 'Repeat password',
    type: 'password',
    placeholder: 'repeat password ...',
    rules: {
        required: {
            value: true,
            message: 'required',
        },
        minLength: {
            value: 6,
            message: 'min 6 characters',
        },
    },
}

export const email_validation = {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'example@gmail.com',
    rules: {
        required: {
            value: true,
            message: 'required',
        },
        pattern: {
            value: /[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            message: "email is invalid"
        }
    },
}
export const login_validation = {
    name: 'login',
    label: 'Login',
    type: 'text',
    placeholder: 'nickname',
    rules: {
        required: {
            value: true,
            message: 'required',
        },
    },
}

export const card_number_validation = {
    name: "number",
    label: "Card number",
    type: "text",
    placeholder: "0000 0000 0000 0000",
    rules: {
        required: {
            value: true,
            message: 'required',
        },
        pattern: {
            value: /^\d{16}$/m,
            message: "number format is invalid"
        }
    }
}

export const card_name_validation = {
    name: "cardName",
    label: "Name on card",
    type: "text",
    placeholder: "Ivan Ivanov",
    rules: {
        required: {
            value: true,
            message: 'required',
        },
        pattern: {
            value: /^[A-z]+ [A-z]+$/m,
            message: "name format is invalid"
        }
    }
}

export const card_cvc_validation = {
    name: "cvc",
    label: "CVC",
    type: "number",
    placeholder: "123",
    rules: {
        required: {
            value: true,
        },
        pattern: {
            value: /^\d{3}$/m,
        }
    }
}

export const card_month_validation = {
    name: "month",
    label: "Month",
    options: Array.from(
        {length: 12},
        (_, i) => (
            {
                label: i + 1,
                value: i
            }
        )
    ),
    rules: {
        required: {
            value: true,
            message: 'required',
        },
    }
}

export const card_year_validation = (startDate) => ({
    name: "year",
    label: "Year",
    options: Array.from(
        {length: 40},
        (_, i) => (
            {
                label: i + startDate,
                value: i + startDate
            }
        )
    ),
    rules: {
        required: {
            value: true,
            message: 'required',
        },
    }
})

export const comments_name_validation = {
    name: 'name',
    label: 'Comment\'s name',
    type: 'text',
    placeholder: "Name your comment",
    rules: {
        required: {
            value: true,
            message: 'required',
        },
    },
}
export const comments_rating_validation = {
    name: 'grade',
    rules: {
        required: {
            value: true,
            message: 'required',
        },
    },
}
export const comments_text_validation = {
    name: 'text',
    label: 'Description',
    type: 'text',
    placeholder: "Provide brief review of the product",
    multiline: true,
    minRows: 10,
    rules: {
        required: {
            value: true,
            message: 'required',
        },
    },
}

export const product_name_validation = {
    name: "name",
    label: "Product name",
    type: "text",
    placeholder: "Cyberpunk 2077",
    rules: {
        required: {
            value: true,
            message: 'required',
        }
    }
}

export const product_cost_validation = {
    name: "cost",
    label: "Product cost",
    type: "number",
    placeholder: "9999",
    rules: {
        required: {
            value: true,
            message: 'required',
        },
        min: {
            value: 0,
            message: 'cost should be positive'
        },
    }
}

export const product_discount_validation = {
    name: "discount",
    label: "Product discount",
    type: "number",
    placeholder: "10",
    rules: {
        required: {
            value: true,
            message: 'required',
        },
        min: {
            value: 0,
            message: 'discount should be between 0 and 100'
        },
        max: {
            value: 100,
            message: 'discount should be between 0 and 100'
        }
    }
}

export const product_genres_list_validation = {
    name: "genres",
    label: "Product genres",
    rules: {
        required: {
            value: true,
            message: 'required',
        }
    }
}

export const product_properties_list_validation = {
    name: "properties",
    label: "Product properties",
    rules: {
        required: {
            value: true,
            message: 'required',
        }
    }
}

export const product_description_validation = {
    name: "description",
    label: "Product description",
    type: "text",
    placeholder: "Bla bla bla...",
    multiline: true,
    minRows: 10,
    rules: {
        required: {
            value: true,
            message: 'required',
        }
    }
}

export const card_validation = {
    name: "card",
    rules: {
        required: {
            value: true,
            message: 'required',
        },
    }
}