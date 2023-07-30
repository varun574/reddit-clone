const plugin = require('tailwindcss/plugin')

module.exports = plugin.withOptions((options= {})=>{
    const prefix = options.prefix || "";
    return function({addComponents}){
        const components = {
            [`.${prefix}btn-brand-outline`]:{
                '@apply text-[#FF4500] outline outline-1 outline-[#FF4500] rounded-full px-4 py-2 transition-all':{},
                '&:hover': {
                    '@apply bg-gray-100 underline':{}    
                }
            },
            [`.${prefix}btn-brand`]:{
                '@apply rounded-full px-4 py-2 bg-[#FF4500] text-white transition-all':{},
                '&:hover': {
                    '@apply bg-[#962900] underline':{},
                }
            }
        }

        addComponents(components)
    }
})

