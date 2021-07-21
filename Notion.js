/*
 * Author: Phuong Duong - FPO Co.,Ltd
 * Email: phuongduong@fpo.vn
 * Created on 14:51:37 - 21/07/2021
 */
const _ = require("underscore");

exports.Title = (content) => {
    return {
        "title": [
            {
                "text": {
                    "content": content
                }
            }
        ]
    }
}

exports.Rich_text = (content) => {
    return {
        "rich_text": [
            {
                "text": {
                    "content": content
                }
            }
        ]
    }
}

exports.Select = (option) => {
    return {
        "select": {
            "name": option
        }
    }
}

exports.MultiSelect = (options) => {
    return {
        "multi_select": _.map(options, (opt) => {
            return {
                "name": opt
            }
        })
    }
}

exports.Number = (number) => {
    return { "number": number }
}

exports.Email = (email) => {
    return { "email": email }
}

exports.Phone = (phone_number) => {
    return { "phone_number": phone_number }
}

exports.Url = (url) => {
    return { "url": url }
}

exports.Checkbox = (isChecked) => {
    return { "checkbox": isChecked }
}