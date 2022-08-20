const Validate = {
  email:
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  password: password => {
    let status = true;
    let message = null;

    // const re = /^(?=.*[A-z])(?=.*\d)[A-z\d]{8,}$/;
    const re = /(?=.*[0-9])(?=.*[a-zA-Z])/;
    // const re1 = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!password || password.trim().length === 0) {
      status = true;
      message = '本項目は必須です。';
    } else if (!re.test(password)) {
      status = true;
      message = '数字、英字をそれぞれ1文字以上含めてください。';
    } else if (password.length < 8 || password.length > 32) {
      status = true;
      message = '8文字以上32文字以内で入力してください。';
    } else {
      status = false;
      message = null;
    }
    return {status, message};
  },

  emptyContentOnly: text => {
    let status = true;
    let message = null;

    if (!text || !`${text}`.trim()) {
      status = true;
      message = '本項目は必須です。';
    } else {
      status = false;
      message = null;
    }
    return {status, message};
  },

  numberContent: text => {
    let status = false;
    let message = null;
    const re = /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/;
    if (!text || !`${text}`.trim()) {
      status = false;
      message = null;
    } else if (!re.test(text)) {
      status = true;
      message = StringsJapanese.only_contain_number;
    } else {
      status = false;
      message = null;
    }
    return {status, message};
  },
  numberContentCompare: (stat, stat2) => {
    let status = true;
    let message = null;
    const re = /^[1-9][0-9]*$/;
    if (!stat || !`${stat}`.trim()) {
      status = false;
      message = '';
    } else if (!re.test(stat)) {
      status = true;
      message = '無効';
    } else if (parseInt(stat) > parseInt(stat2)) {
      status = true;
      message = '収縮期血圧は拡張期血圧より高くありません'; //huyet ap cao ko duoc thap hon huyet ap thap
    } else {
      status = false;
      message = null;
    }
    return {status, message};
  },

  sameContent: (text1, text2, field) => {
    let status = true;
    let message = null;

    if (text2 === null || text2.length === 0) {
      status = true;
      message = '本項目は必須です。';
      return {status, message};
    }
    if (text1 === '' || text1 === null) {
      status = true;
      message = `${field}`;
    } else if (text1 === text2) {
      status = false;
      message = null;
    } else if (text1 !== text2) {
      status = true;
      message = `${field}`;
    }
    return {status, message};
  },
  checkOneContent: (text1, text2) => {
    let status = true;
    let message = null;
    if ((text1 === '' || text1 === null) && (text2 === '' || text2 === null)) {
      status = true;
      message = '本項目は必須です。';
    } else {
      status = false;
      message = null;
    }
    return {status, message};
  },
  phoneNumber: phone => {
    let status = true;
    let message = null;

    // const re = /^(?:\d{11}|\d{3}-\d{3}-\d{4}|\d{2}-\d{4}-\d{4}|\d{3}-\d{4}-\d{4})$/;
    const re = /^[0-9]\d*$/;
    if (phone === null || phone === '') {
      status = true;
      message = '本項目は必須です。';
    } else if (!re.test(phone)) {
      status = true;
      message = '無効な電話番号です。';
    } else if (phone.length < 10 || phone.length > 11) {
      status = true;
      message = '10-11桁で入力してください。';
    } else {
      status = false;
      message = null;
    }
    return {status, message};
  },
  phoneUser: phone => {
    let status = true;
    let message = null;

    const re = /^[0-9]\d*$/;
    if (phone === null || phone === '' || phone === undefined) {
      status = false;
      message = null;
    } else if (!re.test(phone)) {
      status = true;
      message = '無効な電話番号です。';
    } else if (phone.length < 10 || phone.length > 11) {
      status = true;
      message = '10-11桁で入力してください。';
    } else {
      status = false;
      message = null;
    }
    return {status, message};
  },
  postcode: postcode => {
    let status = true;
    let message = null;
    if (postcode === null || postcode === '') {
      status = true;
      message = '本項目は必須です。';
    }
    // const re = /^(?:\d{11}|\d{3}-\d{3}-\d{4}|\d{2}-\d{4}-\d{4}|\d{3}-\d{4}-\d{4})$/;
    const re = /^[0-9]\d*$/;
    if (!re.test(postcode) && postcode && postcode.length > 0) {
      status = true;
      message = '無効電話番号';
    } else {
      status = false;
      message = null;
    }
    return {status, message};
  },
  heightWeight: stat => {
    let status = true;
    let message = null;
    // const re = /^\d{2,3}(\.|,)\d{1}$/;
    const re2 = /^\d*[0-9](((\.|,)\d{1})|\d{0})$/;
    if (!stat || !`${stat}`.trim()) {
      status = false;
      message = '';
    } else if (!re2.test(stat)) {
      status = true;
      message = '※半角数値、小数点以下1桁まで';
    } else {
      status = false;
      message = null;
    }
    return {status, message};
  },
  positiveInteger: stat => {
    let status = true;
    let message = null;
    const re = /^[1-9][0-9]*$/;
    if (!stat || !`${stat}`.trim()) {
      status = true;
      message = '本項目は必須です。';
    } else if (!re.test(stat)) {
      status = true;
      message = '無効';
    } else {
      status = false;
      message = null;
    }
    return {status, message};
  },
  positiveIntegerCompare: (stat, stat2) => {
    let status = true;
    let message = null;
    const re = /^[1-9][0-9]*$/;
    if (!stat || !`${stat}`.trim()) {
      status = true;
      message = '本項目は必須です。';
    } else if (!re.test(stat)) {
      status = true;
      message = '無効';
    } else if (parseInt(stat) > parseInt(stat2)) {
      status = true;
      message = '収縮期血圧は拡張期血圧より高くありません'; //huyet ap cao ko duoc thap hon huyet ap thap
    } else {
      status = false;
      message = null;
    }
    return {status, message};
  },
  decimal: (stat, numberOfDecimal = 2) => {
    let status = true;
    let message = null;
    const re =
      numberOfDecimal === 2 ? /^\d+((\.|,)\d{2})$/ : /^\d+((\.|,)\d{1})$/;
    if (!stat || !`${stat}`.trim()) {
      status = true;
      message = '本項目は必須です。';
    } else if (!re.test(stat)) {
      status = true;
      message = '無効';
    } else {
      status = false;
      message = null;
    }
    return {status, message};
  },
  zipCode: text => {
    let status = false;
    let message = null;

    const re = /^([0-9]{7})$/;

    if (text === null || text === undefined || text?.length === 0) {
      status = false;
      message = null;
    } else if (!re.test(text)) {
      status = true;
      message = '郵便番号は7桁数字で入力してください。';
    } else {
      status = false;
      message = null;
    }
    return {status, message};
  },
  wakaCode: (text, type) => {
    let status = false;
    let message = null;
    const re = /^([0-9]{16})$/;
    if (text === null || text?.length === 0) {
      if (type === 'FromHomePage') {
        status = true;
        message = '郵便番号は7桁数字で入力してください。';
      } else {
        status = false;
        message = null;
      }
    } else if (!re.test(text)) {
      status = true;
      message = '郵便番号は7桁数字で入力してください。';
    } else {
      status = false;
      message = null;
    }
    return {status, message};
  },

  codeInputKeys: /([a-zA-Z0-9])/,
};

export {Validate};
