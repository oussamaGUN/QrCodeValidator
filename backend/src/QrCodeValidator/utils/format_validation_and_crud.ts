import { formatCheck } from "./formate_validator_utils/formateCheck"
import { ClassCheck } from "./interfaces/interfaces";


export const formatValidationAndCRUD = (QrCodes: any) => {
    for (let i = 0;i < QrCodes.length;i++) {
        let formatResult = formatCheck(QrCodes[i]);
        const str: string = QrCodes[i];

        if (formatResult === ClassCheck.VALID && !str.startsWith("No"))
            console.log(`valid + ${QrCodes[i]}`)
        else if (formatResult === ClassCheck.INVALID && !str.startsWith("No"))
            console.log(`invalid + ${QrCodes[i]}`)
        else if (formatResult === ClassCheck.UNREADABLE && !str.startsWith("No"))
            console.log(`unreadable + ${QrCodes[i]}`)
        else if (formatResult === ClassCheck.DUBLICATE && !str.startsWith("No"))
            console.log(`duplicates + ${QrCodes[i]}`)
    }
    
}