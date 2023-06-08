// Customizer const
export const TOGGLE_COLLAPSED_NAV = 'TOGGLE_COLLAPSE_MENU';
export const WINDOW_WIDTH = 'WINDOW-WIDTH';
export const SWITCH_LANGUAGE = 'SWITCH-LANGUAGE';

export const CONNECTION_STATE = {
    NEW: 'NEW',
    CONNECTED: 'CONNECTED',
    DISCONNECTED: 'DISCONNECTED',
    NEGOTIATING: 'NEGOTIATING',
    CLOSED: 'CLOSED'
}

export const RTCConfig = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302"
        }
    ]
        // iceServers: [
        //     {
        //     urls: "stun:a.relay.metered.ca:80",
        //     },
        //     {
        //     urls: "turn:a.relay.metered.ca:80",
        //     username: "2edbf539c73a90baeda19419",
        //     credential: "3+LaQxMdu6hRORbm",
        //     },
        //     {
        //     urls: "turn:a.relay.metered.ca:80?transport=tcp",
        //     username: "2edbf539c73a90baeda19419",
        //     credential: "3+LaQxMdu6hRORbm",
        //     },
        //     {
        //     urls: "turn:a.relay.metered.ca:443",
        //     username: "2edbf539c73a90baeda19419",
        //     credential: "3+LaQxMdu6hRORbm",
        //     },
        //     {
        //     urls: "turn:a.relay.metered.ca:443?transport=tcp",
        //     username: "2edbf539c73a90baeda19419",
        //     credential: "3+LaQxMdu6hRORbm",
        //     },
        // ],
    }
// State Call

export const REGISTERED = 'REGISTERED';
export const IN_CALL = 'IN_CALL';

//Contact Module const
export const FETCH_START = 'fetch_start';
export const FETCH_SUCCESS = 'fetch_success';
export const FETCH_ERROR = 'fetch_error';
export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const HIDE_MESSAGE = 'HIDE_MESSAGE';
export const ON_SHOW_LOADER = 'ON_SHOW_LOADER';
export const ON_HIDE_LOADER = 'ON_HIDE_LOADER';

//Auth const
export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNIN_GOOGLE_USER = 'SIGNIN_GOOGLE_USER';
export const SIGNIN_GOOGLE_USER_SUCCESS = 'SIGNIN_GOOGLE_USER_SUCCESS';
export const SIGNIN_FACEBOOK_USER = 'SIGNIN_FACEBOOK_USER';
export const SIGNIN_FACEBOOK_USER_SUCCESS = 'SIGNIN_FACEBOOK_USER_SUCCESS';
export const SIGNIN_TWITTER_USER = 'SIGNIN_TWITTER_USER';
export const SIGNIN_TWITTER_USER_SUCCESS = 'SIGNIN_TWITTER_USER_SUCCESS';
export const SIGNIN_GITHUB_USER = 'SIGNIN_GITHUB_USER';
export const SIGNIN_GITHUB_USER_SUCCESS = 'signin_github_user_success';
export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNOUT_USER = 'SIGNOUT_USER';
export const SIGNOUT_USER_SUCCESS = 'SIGNOUT_USER_SUCCESS';
export const INIT_URL = 'INIT_URL';
export const USER_DATA = 'user_data';
export const USER_TOKEN_SET = 'user_token_set';
export const UPDATE_LOAD_USER = 'UPDATE_LOAD_USER';

// Auth
export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_TOKEN = 'AUTH_TOKEN';
export const AUTH_IS_VALID = 'AUTH_IS_VALID';
export const AUTH_ROLE = 'AUTH_ROLE';
export const AUTH_PROFILE = 'AUTH_PROFILE';
export const AUTH_ACCESS_FEATURE = 'AUTH_ACCESS_FEATURE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

// CLIENTS
export const CLIENT_ONLINE = 'CLIENT_ONLINE';

// ADMIN
export const ADMIN_ONLINE = 'ADMIN_ONLINE';

// Users
export const USERS_LOADING = 'USERS_LOADING';
export const USERS_QUERY = 'USERS_QUERY';
export const USERS_SORTER = 'USERS_SORTER';
export const USERS_STATUS = 'USERS_STATUS';
export const USERS_DATA = 'USERS_DATA';
export const USERS_TOTAL = 'USERS_TOTAL';
export const USERS_PAGE = 'USERS_PAGE';
export const USERS_ROWS_PER_PAGE = 'USERS_ROWS_PER_PAGE';

// Funders
export const FUNDERS_VIEW_TYPE = 'FUNDERS_VIEW_TYPE';
export const FUNDERS_LOADING = 'FUNDERS_LOADING';
export const FUNDERS_DELETING = 'FUNDERS_DELETING';
export const FUNDERS_SELECTED_ITEMS = 'FUNDERS_SELECTED_ITEMS';
export const FUNDERS_QUERY = 'FUNDERS_QUERY';
export const FUNDERS_SORTER = 'FUNDERS_SORTER';
export const FUNDERS_STATUS = 'FUNDERS_STATUS';
export const FUNDERS_FILTER_ACCOUNT_NAME = 'FUNDERS_FILTER_ACCOUNT_NAME';
export const FUNDERS_FILTER_ACCOUNT_ID = 'FUNDERS_FILTER_ACCOUNT_ID';
export const FUNDERS_FILTER_ACCOUNT_EMAIL = 'FUNDERS_FILTER_ACCOUNT_EMAIL';
export const FUNDERS_DATA = 'FUNDERS_DATA';
export const FUNDERS_TOTAL = 'FUNDERS_TOTAL';
export const FUNDERS_PAGE = 'FUNDERS_PAGE';
export const FUNDERS_ROWS_PER_PAGE = 'FUNDERS_ROWS_PER_PAGE';
export const FUNDERS_UPLOADING = 'FUNDERS_UPLOADING';
export const FUNDERS_UPLOADING_PROGRESS = 'FUNDERS_UPLOADING_PROGRESS';
export const FUNDERS_INFO_LOADING = 'FUNDERS_INFO_LOADING';
export const FUNDERS_INFO_DATA = 'FUNDERS_INFO_DATA';

// funders custom template
export const FUNDERS_CUSTOM_TEMPLATE_DATA = "FUNDERS_CUSTOM_TEMPLATE_DATA";
export const FUNDERS_CUSTOM_TEMPLATE_LOADING = "FUNDERS_CUSTOM_TEMPLATE_LOADING";

// Funder files
export const FILES_BATCH_TYPE = 'FILES_BATCH_TYPE';
export const FILES_BATCH_ID = 'FILES_BATCH_ID';
export const FILES_LOADING = 'FILES_LOADING';
export const FILES_SELECTED_ITEMS = 'FILES_SELECTED_ITEMS';
export const FILES_SENDING = 'FILES_SENDING';
export const FILES_QUERY = 'FILES_QUERY';
export const FILES_SORTER = 'FILES_SORTER';
export const FILES_STATUS = 'FILES_STATUS';
export const FILES_DATA = 'FILES_DATA';
export const FILES_TOTAL = 'FILES_TOTAL';
export const FILES_PAGE = 'FILES_PAGE';
export const FILES_ROWS_PER_PAGE = 'FILES_ROWS_PER_PAGE';
export const DOWNLOAD_FILES_BULK = 'DOWNLOAD_FILES_BULK';

// BlacklistFunder
export const BLACKLIST_LOADING = 'BLACKLIST_LOADING';
export const BLACKLIST_DATA = 'BLACKLIST_DATA';
export const BLACKLIST_TOTAL = 'BLACKLIST_TOTAL';
export const BLACKLIST_PAGE = 'BLACKLIST_PAGE';
export const BLACKLIST_ROWS_PER_PAGE = 'BLACKLIST_ROWS_PER_PAGE';
export const BLACKLIST_SORTER = 'BLACKLIST_SORTER';
export const BLACKLIST_QUERY_ID = 'BLACKLIST_QUERY_ID';
export const BLACKLIST_QUERY_NAME = 'BLACKLIST_QUERY_NAME';
export const BLACKLIST_QUERY_EMAIL = 'BLACKLIST_QUERY_EMAIL';

// blacklist broadcast
export const BLACKLIST_BROADCAST_LOADING = 'BLACKLIST_LOADING';
export const BLACKLIST_BROADCAST_DATA = 'BLACKLIST_DATA';
export const BLACKLIST_BROADCAST_TOTAL = 'BLACKLIST_TOTAL';
export const BLACKLIST_BROADCAST_PAGE = 'BLACKLIST_PAGE';
export const BLACKLIST_BROADCAST_ROWS_PER_PAGE = 'BLACKLIST_ROWS_PER_PAGE';
export const BLACKLIST_BROADCAST_SORTER = 'BLACKLIST_SORTER';
export const BLACKLIST_BROADCAST_QUERY_ID = 'BLACKLIST_QUERY_ID';
export const BLACKLIST_BROADCAST_QUERY_NAME = 'BLACKLIST_QUERY_NAME';
export const BLACKLIST_BROADCAST_QUERY_EMAIL = 'BLACKLIST_QUERY_EMAIL';

// Templates
export const TEMPLATES_LOADING = 'TEMPLATES_LOADING';
export const TEMPLATES_DATA = 'TEMPLATES_DATA';
export const TEMPLATES_TOTAL = 'TEMPLATES_TOTAL';
export const TEMPLATES_PAGE = 'TEMPLATES_PAGE';
export const TEMPLATES_ROWS_PER_PAGE = 'TEMPLATES_ROWS_PER_PAGE';
export const TEMPLATES_SORTER = 'TEMPLATES_SORTER';
export const TEMPLATES_QUERY = 'TEMPLATES_QUERY';
export const TEMPLATES_FILTER_TYPE = 'TEMPLATES_FILTER_TYPE';

// Broadcast Batch
export const BROADCAST_BATCH_LOADING = 'BROADCAST_BATCH_LOADING';
export const BROADCAST_BATCH_DATA = 'BROADCAST_BATCH_DATA';
export const BROADCAST_BATCH_TOTAL = 'BROADCAST_BATCH_TOTAL';
export const BROADCAST_BATCH_PAGE = 'BROADCAST_BATCH_PAGE';
export const BROADCAST_BATCH_ROWS_PER_PAGE = 'BROADCAST_BATCH_ROWS_PER_PAGE';
export const BROADCAST_BATCH_SORTER = 'BROADCAST_BATCH_SORTER';
export const BROADCAST_BATCH_QUERY = 'BROADCAST_BATCH_QUERY';
export const BROADCAST_BATCH_UPLOADING = 'BROADCAST_BATCH_UPLOADING';
export const BROADCAST_BATCH_UPLOADING_PROGRESS = 'BROADCAST_BATCH_UPLOADING_PROGRESS';
export const BROADCAST_REF_TEMPLATES_LOADING = 'BROADCAST_REF_TEMPLATES_LOADING';
export const BROADCAST_REF_TEMPLATES_DATA = 'BROADCAST_REF_TEMPLATES_DATA';

// Broadcast Batch Detail
export const BROADCAST_DETAIL_LOADING = 'BROADCAST_DETAIL_LOADING';
export const BROADCAST_DETAIL_BATCH_ID = 'BROADCAST_DETAIL_BATCH_ID';
export const BROADCAST_DETAIL_SELECTED_ITEMS = 'BROADCAST_DETAIL_SELECTED_ITEMS';
export const BROADCAST_DETAIL_SENDING = 'BROADCAST_DETAIL_SENDING';
export const BROADCAST_DETAIL_DATA = 'BROADCAST_DETAIL_DATA';
export const BROADCAST_DETAIL_TOTAL = 'BROADCAST_DETAIL_TOTAL';
export const BROADCAST_DETAIL_PAGE = 'BROADCAST_DETAIL_PAGE';
export const BROADCAST_DETAIL_ROWS_PER_PAGE = 'BROADCAST_DETAIL_ROWS_PER_PAGE';
export const BROADCAST_DETAIL_SORTER = 'BROADCAST_DETAIL_SORTER';
export const BROADCAST_DETAIL_QUERY = 'BROADCAST_DETAIL_QUERY';
export const BROADCAST_DETAIL_STATUS = 'BROADCAST_DETAIL_STATUS';

// Configuration sender and cc email
export const CONFIGURATION_SENDER_LOADING  = "CONFIGURATION_SENDER_LOADING"
export const CONFIGURATION_SENDER_DATA  = "CONFIGURATION_SENDER_DATA"
export const CONFIGURATION_SENDER_TOTAL  = "CONFIGURATION_SENDER_TOTAL"
export const CONFIGURATION_SENDER_PAGE  = "CONFIGURATION_SENDER_PAGE"
export const CONFIGURATION_SENDER_ROWS_PER_PAGE  = "CONFIGURATION_SENDER_ROWS_PER_PAGE"
export const CONFIGURATION_SENDER_QUERY  = "CONFIGURATION_SENDER_QUERY"
export const CONFIGURATION_CC_LOADING  = "CONFIGURATION_CC_LOADING"
export const CONFIGURATION_CC_DATA  = "CONFIGURATION_CC_DATA"
export const CONFIGURATION_CC_TOTAL  = "CONFIGURATION_SENDER_TOTAL"
export const CONFIGURATION_CC_PAGE  = "CONFIGURATION_SENDER_PAGE"
export const CONFIGURATION_CC_ROWS_PER_PAGE  = "CONFIGURATION_SENDER_ROWS_PER_PAGE"
export const CONFIGURATION_CC_QUERY  = "CONFIGURATION_CC_QUERY"

// broadcast schedule
export const BROADCAST_SCHEDULER_LOADING = "BROADCAST_SCHEDULER_LOADING"
export const BROADCAST_SCHEDULER_DATA = "BROADCAST_SCHEDULER_DATA"
export const BROADCAST_SCHEDULER_TOTAL = "BROADCAST_SCHEDULER_TOTAL"
export const BROADCAST_SCHEDULER_PAGE = "BROADCAST_SCHEDULER_PAGE"
export const BROADCAST_SCHEDULER_ROWS_PER_PAGE = "BROADCAST_SCHEDULER_ROWS_PER_PAGE"
export const BROADCAST_SCHEDULER_SORTER = "BROADCAST_SCHEDULER_SORTER"
export const BROADCAST_SCHEDULER_QUERY = "BROADCAST_SCHEDULER_QUERY"
export const BROADCAST_SCHEDULER_UPLOADING = "BROADCAST_SCHEDULER_UPLOADING"
export const BROADCAST_SCHEDULER_UPLOADING_PROGRESS = "BROADCAST_SCHEDULER_UPLOADING_PROGRESS"
export const BROADCAST_SCHEDULER_REF_TEMPLATES_LOADING = "BROADCAST_SCHEDULER_REF_TEMPLATES_LOADING"
export const BROADCAST_SCHEDULER_REF_TEMPLATES_DATA = "BROADCAST_SCHEDULER_REF_TEMPLATES_DATA"
export const BROADCAST_SCHEDULER_FILTER_TYPE= "BROADCAST_SCHEDULER_FILTER_TYPE"

//broadcast detail schedule
export const SCHEDULE_DETAIL_LOADING = "SCHEDULE_DETAIL_LOADING"
export const SCHEDULE_DETAIL_DELETE = "SCHEDULE_DETAIL_DELETE"
export const SCHEDULE_DETAIL_SELECTED_ITEMS = "SCHEDULE_DETAIL_SELECTED_ITEMS"
export const SCHEDULE_DETAIL_BATCH_ID = "SCHEDULE_DETAIL_BATCH_ID"
export const SCHEDULE_DETAIL_DATA = "SCHEDULE_DETAIL_DATA"
export const SCHEDULE_DETAIL_TOTAL = "SCHEDULE_DETAIL_TOTAL"
export const SCHEDULE_DETAIL_PAGE  = "SCHEDULE_DETAIL_PAGE"
export const SCHEDULE_DETAIL_ROWS_PER_PAGE = "SCHEDULE_DETAIL_ROWS_PER_PAGE"
export const SCHEDULE_DETAIL_SORTER = "SCHEDULE_DETAIL_SORTER"
export const SCHEDULE_DETAIL_QUERY = "SCHEDULE_DETAIL_QUERY"
export const SCHEDULE_DETAIL_STATUS = "SCHEDULE_DETAIL_STATUS"

export const ADDITIONAL_EMAIL_LOADING = "ADDITIONAL_EMAIL_LOADING"
export const ADDITIONAL_EMAIL_PAGE = "ADDITIONAL_EMAIL_PAGE"
export const ADDITIONAL_EMAIL_ROWS_PER_PAGE = "ADDITIONAL_EMAIL_ROWS_PER_PAGE"
export const ADDITIONAL_DATA = "ADDITIONAL_DATA"
export const ADDITIONAL_EMAIL_LIST = "ADDITIONAL_EMAIL_LIST"
export const ADDITIONAL_EMAIL_TOTAL = "ADDITIONAL_EMAIL_TOTAL"
export const ADDITIONAL_EMAIL_QUERY_NAME = "ADDITIONAL_EMAIL_QUERY_NAME"
