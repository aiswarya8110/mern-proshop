import { Helmet } from 'react-helmet-async';

const Meta = ({ title = "Welcome to ProShop", content = "Discover the ultimate shopping experience with our app! Browse a wide selection of products, enjoy exclusive deals, and make secure purchases in just a few taps."})=>{
    return (
        <Helmet>
            <title>{title}</title>
            <link rel='icon' href='/images/favicon.png'/>
            <meta name='description' content={content}/>
            <meta name='author' content='Aiswarya Sarangi' />
        </Helmet>
    )
}

export default Meta;