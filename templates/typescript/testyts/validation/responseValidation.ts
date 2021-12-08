import { validate } from "class-validator";

export async function validateResponse(response: any) {
  return new Promise(function (resolve) {
    validate(response).then(async (errors) => {
      errors.length == 0
        ? resolve(true)
        : console.error(
            `${response.constructor.name} validation failed. Errors:`,
            JSON.stringify(errors, null, 2)
          ),
        resolve(false);
    });
  });
}
