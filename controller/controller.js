import { ZodError } from "zod";
import { enquirySchema } from "../helper/validator.js"
import { sheets } from "../service/googleSheet.js";
import  config  from "../config/config.js";
import dayjs from 'dayjs';

const {GOOGLE_SHEET_ID} = config
export const enquiryController = (req,res) =>{
   try {
    
    // 1. body validation
    const body = enquirySchema.parse(req.body);
    const {name, category, emailAddress, message} = body;

    // 2. Entry in Google sheet
    sheets.spreadsheets.values
     .append({
        spreadsheetId:GOOGLE_SHEET_ID,
        range:'Enquiry!A:E',
        insertDataOption:"INSERT_ROWS",
        valueInputOption:"RAW",
        requestBody:{
            values: [[name,emailAddress,category,message,dayjs().format("DD-MM-YYYY")]]
        }
    })
    .catch((err) => {
        console.error("Error while appending to Google Sheets:", err);
        // Safely access err.response and err.response.data
        if (err.response && err.response.data && err.response.data.error) {
            console.error("Google Sheets API Error:", err.response.data.error);
        }
    });
    

    // 3. Response send
    res.status(201).json({
        success:true,
        message:"Enuiry Received Successfully.Thank You 🙏🏻"
    })
   }catch (error) {
    console.error(error);
    if(error instanceof ZodError){
        return res.status(422).json({
            success:false,
            message: error.errors
        })
    }
    res.sendStatus(500)
   }
}