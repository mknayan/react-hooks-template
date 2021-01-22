export const APIS = {
    COMMON_MARKET: '/common/get-markets',
    GET_CUSTOMER_LIST: '/checklist/getChecklist'
}

export const CL_VENDOR_MAP = {
    CLASS: {
        0: 'need',
        1: 'pending',
        2: 'done',
        '': '',
        null: ''
    },
    STATUS_TEXT: {
        0: 'Need',
        1: 'Pending',
        2: 'Done',
        '': '',
        null: ''
    }
}

export const CL_PERMIT_MAP = {
    CLASS: {
        0: 'not-needed',
        1: 'need',
        2: 'pending',
        3: 'done',
        '': '',
        null: ''
    },
    STATUS_TEXT: {
        0: 'Not Needed',
        1: 'Need',
        2: 'Pending',
        3: 'Done',
        '': '',
        null: ''
    }
}

export const CL_HMU_MAP = {
    CLASS: {
        0: 'not-needed',
        1: 'need',
        2: 'done',
        '': '',
        null: ''
    },
    STATUS_TEXT: {
        0: 'Not Needed',
        1: 'Need',
        2: 'Done',
        '': '',
        null: ''
    }
}

export const CL_FLOWER_MAP = {
    CLASS: {
        0: 'not-needed',
        1: 'pending',
        2: 'done',
        '': '',
        null: ''
    },
    STATUS_TEXT: {
        0: 'Not Needed',
        1: 'Pending',
        2: 'Done',
        '': '',
        null: ''
    }
}

export const CL_ITINERARY_MAP = {
    CLASS: {
        0: 'not-needed',
        1: 'pending',
        2: 'done',
        '': '',
        null: ''
    },
    STATUS_TEXT: {
        0: 'Not Needed',
        1: 'Pending',
        2: 'Done',
        '': '',
        null: ''
    }
}

export const CL_INVOICE_MAP = {
    CLASS: {
        0: '',
        1: 'text-primary',
        2: 'text-primary',
        '': '',
        null: ''
    },
    STATUS_TEXT: {
        0: 'Needs Approval',
        1: 'Invoice and Custom Invoice Unpaid',
        2: 'Invoice and Custom Invoice Unpaid',
        '': '',
        null: ''
    }
    // needs approval
    // custom invoice unpaid
    // invoice unpaid
    // invoice and custom invoice unpaid
}