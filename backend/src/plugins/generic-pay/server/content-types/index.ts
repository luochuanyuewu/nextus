'use strict';

import { Schema } from '@strapi/strapi';

interface SchemaObject {
    [key: string]: {
        schema: Schema;
    };
}

const schemaObject: SchemaObject = {
};

export default schemaObject;