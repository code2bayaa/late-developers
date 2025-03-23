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

const createOrder = async () => {

    const collect = {

        body: {

            intent: "CAPTURE",

            purchaseUnits: [

                {

                    amount: {

                        currencyCode: "USD",

                        value: amount,

                    },

                },

            ],

        },

        prefer: "return=minimal",

    }; 


    try {

        const { body, ...httpResponse } = await ordersController.ordersCreate(

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

        }

    }

};


export async function POST(request, response){

    try{
        const {amount} = await request.json()



        const { jsonResponse, httpStatusCode } = await createOrder();
    
        return NextResponse.json(jsonResponse,{status:httpStatusCode})
    }catch(error){
        return NextResponse.json({error:error.message},{status:500})
    }

    
}