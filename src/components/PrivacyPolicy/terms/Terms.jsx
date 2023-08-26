import "./Terms.css"
import {useEffect} from 'react';

function Terms(){
   useEffect(()=>{
      document.title="Terms & Conditions";
  },[])
    return(
        <div className="container">
                <h1 className="text-center my-4 head"> Terms & Conditions </h1>
                <p className="fw-600">By using this site the user has unconditionally accepted the terms and conditions of use as given hereunder and/or elsewhere in the site.</p>
                <ol className="">
                    <li className="">
                    <p>The user may carefully read all the information on products and services as provided in relevant sections and in FAQs.</p>
                    </li>
                    <li className="">
                    <p>No material from this site or any other website owned, operated, controlled or licensed by yas and/or its associates or its sister concerns may be copied, reproduced, republished, transmitted, downloaded, uploaded or in any other manner for commercial use or otherwise without the written permission of the yas. Violation of this condition is a violation of copyright and other proprietary rights of the Company and/or its associates or sister concerns or affiliates and will attract legal action as per existing laws of the Government of India.</p>
                    </li>
                    <li className="">
                    <p>The products/services provided on this site are without warranties of any kind either expressed or implied and yas disclaims all or any of them fully. yas does not warrant that the products/services offered will be error-free, or that the defects will be corrected, or that this site or the server that makes it available are or will be free of viruses or other harmful components. Any warranties or After Sale Services if any offered by the Manufacturers/Vendors on any product shall be serviced directly by such Manufacturer/Vendor and yas shall not be under any obligation to ensure compliance or handle complaints.</p>
                    </li>
                    <li className="">
                    <p>There is sometime a possibility of extra charges like Octroi, Taxes or Duties which are to be borne by the recipient at the time of delivery. Please note that yas does not control these charges.</p>
                    </li>
                    <li className="">
                    <p>For Flowers, Sweets or other items that are perishable in nature, the delivery would be attempted only once. If the delivery is not executed during that attempt due to incorrect or insufficient address, recipient not at home, address found locked or refusal to accept, the customer shall still be charged for the order. No refunds would be entertained for such items.</p>
                    </li>
                    <li className="">
                    <p>Since flower arrangements are hand-made, there may be a slight variation from the picture shown. However, we will make sure that we deliver the flower arrangement as close as possible to the description/ photograph shown.</p>
                    </li>
                    <li className="">
                    <p>The product specifications (weight, size, color etc.) mentioned with the product photos are only approximate. Most products here are handmade items. There may, hence, be a variation in the pictures and the respective products. yas, at its absolute discretion, may deliver a similar / alternate product for reasons or exigencies beyond its control.</p>
                    </li>
                    <li className="">
                    <p>Under no circumstances whatsoever shall yas be liable for any loss of data, loss of profits or any damages whatsoever including, without limiting, any indirect, special, incidental, consequential or other damages that result from the use of or inability to use the products/services offered on the site Notwithstanding the foregoing, in no event shall yas be liable to the user for any or all damages, losses, and causes of action (including but not limited to, negligence) or otherwise exceeding the amount paid by the user to yas for that specific service/product.</p>
                    </li>
                    <li className="">
                    <p>n an effort to provide our customers with the most current information, yas will, from time to time, make changes in the Contents and in the products or services described on this Site. The prices advertised on this Site are for Internet orders. Prices and the availability of items are subject to change without notice. Any prices used on this Site may not be indicative of the actual selling prices in your area. We reserve the right to limit sales, including the right to prohibit sales to re-sellers. We are not responsible for typographical or photographic errors.</p>
                    </li>
                    <li className="">
                    <p>Users who have availed services through yasgifts.me by selecting one or more listed service providers: yasgifts.me reaches out to these users via SMS / E-mail / Call / WhatsApp messages Online after their scheduled appointment schedule and ask them for Feedback on their experience or inform them on the latest product updates from the Service provider. yasgifts.me has complete ownership of this flow of feedback collection.</p>
                    </li>
                    <li className="">
                    <p>Notwithstanding any or all of the terms, conditions & disclaimers stated herein above and in FAQ or elsewhere in the site, any refund or payment by yas to the user or anyone else acting on his behalf for any reason whatsoever, voluntarily or on being claimed by any user shall not become a waiver of any or all of the Terms, Conditions and Disclaimers made and shall not become a precedent for similar future actions/claims or confer any rights on the claimant. AND further that all such refunds/payments if any when made shall be subject to 10% deduction on account of Bank charges and other processing overheads.</p>
                    </li>
                    <li className="">
                    <p>If the user has any questions, doubts or confusion in regard to any of the terms & conditions set out herein, he should seek clarifications from us through email support@yasgifts.me and should wait for a written clarification before using the service</p>
                    </li>
                    <li>
                    <p>We are committed to delivering your ordered items promptly and efficiently. Our standard delivery timeframe is designed to ensure you receive your items in a timely manner. Most orders are processed and delivered within 2 to 3 business days from the date of purchase. Please note that this timeframe may vary based on factors such as item availability, location, and any unforeseen circumstances. We strive to keep you updated on the status of your order every step of the way.</p>
                    </li>
                    <li className="">
                    <p>In case of a query, concern, or complaint in relation to compliance issues related to Consumer Protection (E-Commerce) Rules, Consumer Protection Act and Information Technology (Sensitive Personal Data or Information) Rules, please contact Mr. Mohd ALi (Compliance Officer) at contact@yasgifts.me.</p>
                    </li>
                    <li className="">
                    <p>The user of yas is presumed to have read all the terms and conditions herein and FAQ and is deemed to have agreed, understood and accepted unconditionally all the terms, conditions, procedures and risks of using the services and cannot at any time claim ignorance of any or all of them. In event of any disputes between the parties in connection with any provision, both the parties hereto, shall endeavour to settle dispute amicably. In event Parties fail to settle within 30 days, the dispute shall be referred to sole Arbitrator, governed by the Arbitration and Conciliation Act, 1996. All the disputes will subject to the Judiciary of Lucknow Jurisdiction.</p></li>
                </ol>
        </div>
    )
}
export default Terms;