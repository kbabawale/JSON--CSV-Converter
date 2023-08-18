class JSONCSV {
  _csvResult: string;

  convert<T>(data: T) {
    const _isArray = Array.isArray(data);

    if (_isArray) {
      this._csvResult = this.convertArray(data);
      this.download();
    } else {
      this._csvResult = this.convertObject(data);
      this.download();
    }
  }

  convertArray<T>(data: T[]) {
    const _isObject = <I>(d: I) => typeof d === 'object';
    let header = Object.keys(data[0]);
    let finalHeader = [];

    const replacer = (key: string, value: unknown) => {
      return value === null ? '' : value;
    };

    const csv = data.map((row) => {
      return header
        .map((fieldName, indPos) => {
          if (!_isObject(row[fieldName])) {
            finalHeader = [...finalHeader, fieldName];
            return JSON.stringify(row[fieldName], replacer);
          }
          if (_isObject(row[fieldName])) {
            const objheader = Object.keys(row[fieldName]);
            if (
              objheader.every((x) => {
                return header.includes(x);
              }) === false
            ) {
              finalHeader = [...new Set([...finalHeader, ...objheader])];
            }

            return this.convertObject(row[fieldName], true);
          }
        })
        .join(',');
    });

    csv.unshift(header.map((x) => x.toUpperCase()).join(','));
    return csv.join('\r\n');
  }

  convertObject<T>(data: T, recursive: boolean = false) {
    const header = Object.keys(data);

    const replacer = (key: string, value: unknown) => {
      return value === null ? '' : value;
    };

    const csv = [
      header
        .map(function (fieldName) {
          return JSON.stringify(data[fieldName], replacer);
        })
        .join(','),
    ];

    if (recursive) {
      return csv.join('\r\n');
    }

    csv.unshift(header.map((x) => x.toUpperCase()).join(','));
    return csv.join('\r\n');
  }

  download() {
    var link = document.createElement('a');
    link.setAttribute(
      'href',
      'data:text/csv;charset=utf-8,%EF%BB%BF' +
        encodeURIComponent(this._csvResult)
    );
    link.setAttribute('download', 'cynthia.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// const data = [
//   {
//     name: 'Kolapo',
//     age: 19,
//     entryPoint: {
//       dob: '25/09/1993',
//       placeOfBirth: 'Lagos',
//     },
//     exitPoint: {
//       lat: 4332.3,
//       lng: 34.3,
//     },
//   },
//   {
//     name: 'Kolapo',
//     age: 56,
//     entryPoint: {
//       dob: '25/09/1993',
//       placeOfBirth: 'Lagos',
//     },
//     exitPoint: {
//       lat: 4332.3,
//       lng: 34.3,
//     },
//   },
//   {
//     name: 'Kolapo',
//     age: 4,
//     entryPoint: {
//       dob: '25/09/1993',
//       placeOfBirth: 'Lagos',
//     },
//     exitPoint: {
//       lat: 4332.3,
//       lng: 34.3,
//     },
//   },
//   {
//     name: 'Kolapo',
//     age: 43,
//     entryPoint: {
//       dob: '25/09/1993',
//       placeOfBirth: 'Lagos',
//     },
//     exitPoint: {
//       lat: 4332.3,
//       lng: 34.3,
//     },
//   },
// ];
const data = [
  {
    id: 'c99eb280-d59a-4e88-8b3c-c3c023767bf3',
    user_id: '49c72568-8963-40e4-aa46-bf0ef9d585b3',
    bank_id: '8da7b1fb-d0b3-4b8b-a313-d1c31bf456a3',
    organisation_ref: 'ZIK_AQB4',
    invoice_ref: 'WITZIKR17EFP',
    amount: '50000.00',
    ledger_balance: '52970.74',
    available_balance: '52970.74',
    currency: 'NGN',
    channel: 'PAYSTACK',
    type: 'DEBIT',
    status: 'SUCCESS',
    description:
      'Wallet withdrawal of NGN50000 into GTBank Plc/0125894668 account',
    date: '2023-08-17T10:06:39.512Z',
    entry_props: {
      bank: 'GTBank Plc',
      name: 'cynthia customuser',
      email: 'cynthia@cynthia.com',
      phone: '',
      is_driver: true,
      is_business: false,
      account_name: 'NWAKAEME CYNTHIA EBERE',
      account_number: '0125894668',
      is_vehicle_owner: true,
    },
  },
  {
    id: '0ca7d115-2dd8-4151-8758-da09dba32df4',
    user_id: '49c72568-8963-40e4-aa46-bf0ef9d585b3',
    bank_id: 'b3fca9d3-5b22-4820-a738-541a1b7f0b09',
    organisation_ref: 'ZIK_AQB4',
    invoice_ref: 'WITZIKXM4MHV',
    amount: '30000.00',
    ledger_balance: '102970.74',
    available_balance: '102970.74',
    currency: 'NGN',
    channel: 'PAYSTACK',
    type: 'DEBIT',
    status: 'SUCCESS',
    description:
      'Wallet withdrawal of NGN30000 into First Bank of Nigeria/3064907801 account',
    date: '2023-08-17T10:06:18.454Z',
    entry_props: {
      bank: 'First Bank of Nigeria',
      name: 'cynthia customuser',
      email: 'cynthia@cynthia.com',
      phone: '',
      is_driver: true,
      is_business: false,
      account_name: 'NWAKAEME CYNTHIA EBERE',
      account_number: '3064907801',
      is_vehicle_owner: true,
    },
  },
];
const dataObj = {
  name: 'Kolapo',
  age: null,
};
const a = new JSONCSV();
// a.convert(data);
