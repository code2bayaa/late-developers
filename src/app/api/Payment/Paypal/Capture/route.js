// import client from "./../lib/route"
import {

    ApiError,

    OrdersController,

    PaymentsController,
    Client,

    Environment,

    LogLevel

} from "@paypal/paypal-server-sdk";
import {NextResponse} from "next/server"

const {
    paypal_live_client,
    paypal_live_secret
} = process.env

const client = new Client({

    clientCredentialsAuthCredentials: {

        oAuthClientId: paypal_live_client,

        oAuthClientSecret: paypal_live_secret,

    },

    timeout: 0,

    // environment: Environment.Sandbox,
    environment: Environment.Production,

    logging: {

        logLevel: LogLevel.Info,

        logRequest: { logBody: true },

        logResponse: { logHeaders: true },

    },

});
const ordersController = new OrdersController(client);

const paymentsController = new PaymentsController(client);


export async function POST(){

    const {id} = await request.json()

    const captureOrder = async (orderID) => {

        const collect = {
    
            id: orderID,
    
            prefer: "return=minimal",
    
        };
    
    
        try {
    
            const { body, ...httpResponse } = await ordersController.ordersCapture(
    
                collect
    
            );
    
            // Get more response info...
    
            // const { statusCode, headers } = httpResponse;
    
            return {
    
                jsonResponse: JSON.parse(body),
    
                httpStatusCode: httpResponse.statusCode,
    
            };
    
        } catch (error) {
    
            if (error instanceof ApiError) {
    
                // const { statusCode, headers } = error;
    
                throw new Error(error.message);
                // return {
                //     message:error.message,
                //     error:true
                // }
    
            }
    
        }
    
    };

    try{
        const { jsonResponse, httpStatusCode } = await captureOrder(id);
        return NextResponse.json(jsonResponse,httpStatusCode)
    }catch(error){
        return NextResponse.json({error:"failed to capture " + error.message},{status:500})
    }
    
}