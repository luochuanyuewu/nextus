/**
 * payext service
 */

import { Strapi } from "@strapi/strapi";

export default ({strapi} :{strapi:Strapi}) => ({
    /**
     * 通过支付标识获得支付配置
     *
     * @param string $check 支付标识
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model|object|null
     *
     * @author    assimon<ashang@utf8.hk>
     * @copyright assimon<ashang@utf8.hk>
     * @link      http://utf8.hk/
     */
    detailByCheck(check:String)
    {
        let gateways = strapi.entityService.findMany('api::pay.pay',{
            filters:{
                pay_check:check,
                is_open: 1
            }
        })
        return gateways[0]
    }
});
