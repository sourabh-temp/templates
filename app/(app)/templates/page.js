import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductList from '@/components/CategoryProduct';



const Page = () => {
  return (
  	<>
  	<Header />
    <div>
    <ProductList />
    </div>
    <Footer />
    </>
  );
};

export default Page;