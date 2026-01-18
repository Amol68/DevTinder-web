import axios from "axios";
import { Check } from "lucide-react";
import { baseUrl } from "../utils/constants";

const Premium = () => {



  const handleBuyClick = async (type) => {
  

    const order = await  axios.post(baseUrl + "/payment/create",{
        membershipType:type
    },{
      withCredentials:true
    })
    

    const {amount, currency,orderId,notes} = order?.data?._doc ?? {}
  
    const options = {
        key: 'rzp_test_S2AMT31DMYyUXO', // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits.
        currency: currency,
         name: "DumBle",
         description:"Bumble for nerds",
       
        order_id:orderId, // This is the order_id created in the backend
        callback_url: '', // Your success URL
        prefill: {
          name: `${notes?.firstName} ${notes.lastName}`,
         
          
        },
        theme: {
          color: '#F37254'
        },
      };
   const rzp = new window.Razorpay(options);
      rzp.open();

  }

  return (
    <div className="min-h-screen bg-base-200    flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        
        {/* Header */}
        <div className="text-center mb-10 ">
          <h1 className="text-3xl font-bold">Upgrade to Premium</h1>
          <p className="text-gray-400 mt-2">
            Unlock exclusive features and grow your developer network faster
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Silver Plan */}
          <div className="card bg-base-300 border hover:shadow-xl transition">
            <div className="card-body gap-4 ">
              <h2 className="text-xl font-semibold text-center">
                Silver Membership
              </h2>

              <p className="text-center text-3xl font-bold">
                ₹199<span className="text-sm font-normal text-gray-400"> / month</span>
              </p>

              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-success" />
                  Blue verification badge
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-success" />
                  Chat with other developers
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-success" />
                  100 connections per day
                </li>
              </ul>

              <button onClick={()=>handleBuyClick("silver")} className="btn btn-outline btn-secondary mt-4 w-full">
                Buy Silver
              </button>
            </div>
          </div>

          {/* Gold Plan */}
          <div className="card  bg-base-300 border border-primary relative hover:shadow-xl transition">
            
            {/* Badge */}
            <span className="badge badge-primary absolute -top-3 right-4">
              Most Popular
            </span>

            <div className="card-body gap-4">
              <h2 className="text-xl font-semibold text-center">
                Gold Membership
              </h2>

              <p className="text-center text-3xl font-bold">
                ₹399<span className="text-sm font-normal text-gray-400"> / month</span>
              </p>

              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-success" />
                  Blue verification badge
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-success" />
                  Unlimited chat access
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-success" />
                  Unlimited connections
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-success" />
                  Priority profile visibility
                </li>
              </ul>

              <button onClick={()=>handleBuyClick("gold")} className="btn btn-primary mt-4 w-full">
                Buy Gold
              </button>
            </div>
          </div>

        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Payments are secure and processed via Razorpay
        </p>
      </div>
    </div>
  );
};

export default Premium;
