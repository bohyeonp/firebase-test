export const checkPassword = password => {
    let char_type = 0;
    if(/[a-z]/.test(password)) char_type = char_type+1;
    if(/[A-Z]/.test(password)) char_type = char_type+1;
    if(/\d/.test(password)) char_type = char_type+1;
    if (/[~!@#$%\^&*()_+`\-={}|[\]\\:";'<>?,./]/gi.test(password)) char_type = char_type + 1;
    return char_type > 2 && password.length > 9;
};

export const checkName = name => {
    const regId = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;
    return regId.test(name);
};

export const checkBirth = birth => {
    const regBirth = /^(19\d\d|20\d{2})(0\d|1[0-2])(0[1-9]|[1-2]\d|3[0-1])$/;
    return regBirth.test(birth);
};

export const checkPhoneNumber = number => {
    const regPhone = /^01([0|1|6|7|9])(\d{4})(\d{4})$/;
    return regPhone.test(number);
};

export const comma = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
};
