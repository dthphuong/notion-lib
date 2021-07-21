/*
 * Author: Phuong Duong - FPO Co.,Ltd
 * Email: phuongduong@fpo.vn
 * Created on 17:00:30 - 19/07/2021
 */
require("dotenv").config();
const { Client } = require("@notionhq/client");
const _ = require("underscore");
const moment = require("moment");
const Notion = require('./Notion');

// this line initializes the Notion Client using our key
const notion = new Client({ auth: process.env.NOTION_API_KEY });


exports.query = async (databaseId) => {
    const response = await notion.databases.query({ database_id: databaseId });
    // console.log(JSON.stringify(response, null, 4));

    let result = _.map(response.results, (item) => {
        let properties = item.properties

        return _.mapObject(properties, (propValue, propName) => {
            switch (propValue.type) {
                case 'title':
                    if (propValue.title.length > 0) {
                        return _.first(propValue.title).plain_text;
                    } else {
                        return '';
                    }
                case 'rich_text':
                    if (propValue.rich_text.length > 0) {
                        return _.first(propValue.rich_text).plain_text;
                    } else {
                        return '';
                    }
                case 'number':
                    return propValue.number;
                case 'checkbox':
                    return _.isUndefined(propValue.checkbox) ? false: propValue.checkbox;
                case 'date':
                    if (_.isUndefined(propValue.date)) {
                        return { startAt: moment().startOf('day'), endAt: moment().endOf('day') }
                    } else {
                        if (_.isNull(propValue.date.end)) {
                            return { startAt: moment(new Date(propValue.date.start))}
                        }
                    }
                case 'select':
                    return _.omit(propValue.select, 'id');
                case 'multi_select':
                    return _.map(propValue.multi_select, (item) => {return {name: item. name, color: item.color}});
                case 'phone_number':
                    return propValue.phone_number;
                case 'emai':
                    return propValue.emai;
                case 'url':
                    return propValue.url;
            }
        })


    })

    return result;
};

exports.create = async (databaseId, data) => {
    const response = await notion.pages.create({
        parent: { database_id: databaseId},
        properties: data
    });

    await notion.pages.update({
        page_id: response.id,
        properties: {
            ID: Notion.Rich_text(response.id)
        }
    });

    return response
}

exports.update = async (pageId, data) => {
    const response = await notion.pages.update({
        page_id: pageId,
        properties: data
    });

    return response
}

exports.delete = async (pageId) => {
    const response = await notion.pages.update({
        page_id: pageId,
        archived: true
    });

    return response
}


