/*
 * Author: Phuong Duong - FPO Co.,Ltd
 * Email: phuongduong@fpo.vn
 * Created on 10:36:20 - 21/07/2021
 */
require("dotenv").config();
const DB = require('./database');
const _ = require("underscore");
const async = require("async");
const axios = require('axios');
const Notion = require('./Notion');
const faker = require('faker');

const databaseId = process.env.NOTION_API_DATABASE;

// DB.query(databaseId)
//     .then((response) => {
//         console.log(`Data: ${JSON.stringify(response, null, 4)}`);
//     })

DB.create(databaseId, {
    "Họ tên": Notion.Rich_text(faker.name.findName()),
    "Email": Notion.Email(faker.internet.email()),
    "Phone": Notion.Phone(faker.phone.phoneNumber()),
    "Lĩnh vực": Notion.Select(faker.name.jobArea())
})
    .then((response) => {
        console.log(`Data: ${JSON.stringify(response, null, 4)}`);
    })


// DB.update('09390581-16dc-4ac2-870e-6928c8fd9827', {
//     Name: Notion.Title('Hatake Kakshi PRO'),
//     Select: Notion.Select('Ninja sao chép'),
//     MultiSelect: Notion.MultiSelect(['Lôi', 'Phong', 'Thuỷ', 'Thổ', 'Hoả', 'Sharingan']),
// })
//     .then((response) => {
//         console.log(`Data: ${JSON.stringify(response, null, 4)}`);
//     })

// DB.delete('21ffdb99-48c1-4837-a72e-ca68002fb5ad')
//     .then((response) => {
//         console.log(`Data: ${JSON.stringify(response, null, 4)}`);
//     })