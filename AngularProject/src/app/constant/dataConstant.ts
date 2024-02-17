export const dataConstant = {
  MessageType: {
    danger: 'danger',
    warning: 'warning',
    success: 'success-msg',
    failure: 'failure',
    error: 'Error-msg',
  },
  APIStatus: {
    Success: "Success",
    Failure: "Failure",
    Warning: "Warning",
    RecordNotFound: "Record Detail Not Exist",
    Exists: "Exists",
    NotFound: "NotFound",
    DuplicateRecord: "DuplicateRecord",
    ChildRecordExist: "ChildRecordExist"
  },
  StatusCode: {
    //Success
    200: '200',//OK
    201: '201',//Created
    204: '204',//No Content
    //Redirection
    304: '304',//Not Modified
    //Client Error
    400: '400',//Bad Request
    401: '401',//Unauthorized
    402: '402',//Created
    403: '403',//Forbidden
    404: '404',//Not Found
    409: '409',//Conflict
  },
  DateFilter: {
    OldesttoNewest: "Oldest to Newest",
    NewesttoOldest: "Newest to Oldest"
  },
  datePattern: /^\d{2}-\d{2}-\d{4}$/,
  NumberWithDecimal: /^[0-9]+(\.[0-9]{1,2})?$/,
  // DecimalWithTwoPointPattern: /^[1-9][0-9]{0,2}(?:,?[0-9]{2}){0,1}(?:\.[0-9]{0,2})?$/,
  DecimalWithSevenPointPattern: /^[1-9][0-9]{0,4}(?:,?[0-9]{3}){0,2}(?:\.[0-9]{0,7})?$/,
  //NumberWithtentwoDecimal: /^[1-9][0-9]{0,3}(?:,?[0-9]{2}){0,2}(?:\.[0-9]{0,2})?$/,
  Numberony: /^[0-9]*$/,
  PasswordPattern: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?!.*\s).{6,}$/,
  PhoneNoPattern: /^(?:\+?\d{1,3}\s*-?)?\(?(?:\d{3})?\)?[- ]?\d{3}[- ]?\d{4}$/,
  EmailPattren: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  WeekDay: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  Months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  QualificationList: ['Certificate', 'Diploma', 'Bachelor', 'Master', 'M.Phil', 'PhD'],

  DateFormatArray:
    ['dd/MM/yyyy'                       //00. 13-12-2018
      , 'dd-MMMM-yyyy'                //01. 13-12-2018
      , 'yyyy/MM/dd'                  //02. 2018/12/13
      , 'dd.MM.yyyy'                  //03. 13.12.2016
      , 'shortDate'                   //04. 
      , 'MM/dd/yyyy'                  //05. 12/13/2018
      , 'MM/dd/yyyy HH:mm'            //06. 12/13/2018 15:12
      , 'yyyy-MM-dd hh:mm a'          //07. 2018-12-13 03:12 PM
      , 'yyyy/MM/dd hh:mm a'          //08. 2018/12/13 03:12 PM
      , 'yyyy-MM-dd'                  //09. 2018-12-13
      , 'hh:mm a'                     //10. 03:12 PM
      , 'MMM dd,yyyy hh:mm a'         //11. DEC 13,2018 03:12 PM
      , 'dd MMMM, yyyy'               //12. 13 DECEMBER, 2018
      , 'dd MMM yyyy'                 //13. 13 DEC, 2018
      , 'MM/DD/YYYY  HH:mm:ss'        //14. 12/13/2018 15:12:20
    ],

  LtcUser: "f57ae075-6dff-4e04-b885-1ced9eb84924",
  TrainingOfficer: "b5ab0355-b020-419d-8c42-1ba21247994c",
  CountryList: [
    {
      Name: 'Albania',
      Group: 'East Europe',
      CountryClass: ''
    },
    {
      Name: 'Algeria',
      Group: 'Africa',
      CountryClass: ''
    },
    {
      Name: 'Algeria',
      Group: 'Africa',
      CountryClass: ''
    },
    {
      Name: 'Algeria',
      Group: 'Africa',
      CountryClass: ''
    },
    {
      Name: 'Algeria',
      Group: 'Africa',
      CountryClass: ''
    },

  ],
  Studies: [
    {
      Id: 1,
      Name: 'Biology',
      SubCategory: [
        { Name: 'Microbiology' },
        { Name: 'Marine Biology' }
      ]
    },
    {
      Id: 2,
      Name: 'Computer Science',
    },
    {
      Id: 3,
      Name: 'Ecology',
    },
    {
      Id: 4,
      Name: 'Marine Ecology ',
    },
    {
      Id: 5,
      Name: 'Environment',
    },
    {
      Id: 6,
      Name: 'Marine environment',
    },
    {
      Id: 7,
      Name: 'Environmental Studies',
    },
    {
      Id: 8,
      Name: 'Engineering',
      SubCategory: [
        { Name: 'Electrical' },
        { Name: 'Marine' },
        { Name: 'Mechanical' },
        { Name: 'Mechatronics' },
        { Name: 'Mining Engineering ' },
        { Name: 'Mineral Processing Engineering' },
        { Name: 'Metallurgical Engineering' },
        { Name: 'Mining technology development and technology for extractive metallurgy.' },      
      ]
    },
    {
      Id: 9,
      Name: 'Geology',
      SubCategory: [
        { Name: 'Marine geology' },
        { Name: 'Resource geology' },
        { Name: 'Economic geology' },       
      ]
    },
    {
      Id: 10,
      Name: 'Geophysics',
    },
    {
      Id: 11,
      Name: 'Marine geophysics',
    },
    {
      Id: 12,
      Name: 'International marine policy',
    },
    {
      Id: 13,
      Name: 'Law',
    },
    {
      Id: 14,
      Name: 'Marine sciences',
    },
    {
      Id: 15,
      Name: 'Oceanography',
    },
    {
      Id: 16,
      Name: 'Zoology',
    },
  ]


}
