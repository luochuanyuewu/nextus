interface Feature {
  id: string
  attributes: {
    name: string
  }
}

interface Plan {
  id: string
  name: string
  description: string
  price: number
  pricePeriod: string
  isRecommended: boolean
  product_features: {
    data: Feature[]
  }
}

interface PriceProps {
  data: {
    id: string
    title: string
    plans: Plan[]
  }
}

export default function PricingBlock({ data }: PriceProps) {
  return (
    <section className='m:py-12 py-20 dark:bg-black dark:text-gray-100 lg:py-24'>
      <div className='container mx-auto px-4 '>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <span className='font-bold uppercase tracking-wider dark:text-violet-400'>
            Pricing
          </span>
          <h2 className='text-4xl font-bold lg:text-5xl'>{data.title}</h2>
        </div>
        <div className='mx-auto flex max-w-5xl flex-wrap items-stretch'>
          {data.plans.map((plan: Plan) => (
            <div
              key={plan.id}
              className='mb-8 w-full p-4  sm:mx-40 lg:mx-0 lg:mb-0 lg:w-1/3'
            >
              <div
                className={`flex min-h-[475px] min-w-[300px] flex-col space-y-6 rounded p-6 shadow sm:p-8 ${
                  plan.isRecommended ? 'dark:bg-violet-600' : 'dark:bg-gray-800'
                }`}
              >
                <div className='space-y-2'>
                  <h4 className='mb-6 text-3xl font-bold'>{plan.name}</h4>
                  <span className='text-6xl font-bold '>
                    {plan.price}
                    <span
                      className={`tracking-wid ml-1 text-sm ${
                        plan.isRecommended
                          ? 'dark:text-gray-900'
                          : 'dark:text-violet-500'
                      }`}
                    >
                      {plan.pricePeriod.toLowerCase()}
                    </span>
                  </span>
                </div>
                <p
                  className={`mt-3 text-lg font-bold leading-relaxed ${
                    plan.isRecommended
                      ? 'dark:text-gray-900'
                      : 'dark:text-gray-400'
                  }`}
                >
                  {plan.description}
                </p>
                <ul
                  className={`mb-6 flex-1 ${
                    plan.isRecommended
                      ? 'font-semibold dark:text-gray-900'
                      : 'dark:text-gray-400'
                  }`}
                >
                  {plan.product_features.data.map((feature: Feature) => (
                    <li key={feature.id} className='mb-2 flex space-x-2'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        className={`h-6 w-6 flex-shrink-0 ${
                          plan.isRecommended
                            ? 'dark:text-gray-900'
                            : 'dark:text-gray-400'
                        }`}
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                      <span>{feature.attributes.name}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type='button'
                  className={`inline-block rounded px-5 py-3 text-center font-semibold tracking-wider   ${
                    plan.isRecommended
                      ? 'dark:bg-gray-900 dark:text-violet-400'
                      : 'dark:bg-violet-400 dark:text-gray-900'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
