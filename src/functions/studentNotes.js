import moment from "moment";

export function convertUserToArra(obj) {
  const result = [];
  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      const newObj = { exam: key };
      for (let nestedKey in obj[key]) {
        if (nestedKey === "date") {
          newObj[nestedKey] = moment(obj[key][nestedKey]).format(
            "MM-DD-YYYY hh:mm"
          );
        } else {
          newObj[nestedKey] = obj[key][nestedKey];
        }
      }
      result.push(newObj);
    }
  }

  return result;
}
