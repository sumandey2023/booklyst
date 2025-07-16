import EcommerceComponent from "../components/EcommerceComponent";
import ResortComponent from "../components/ResortComponent";
import ResturantComponent from "../components/ResturantComponent";
import ServiceComponet from "../components/ServiceComponet";

const Home = () => {
  return (
    <div className="flex flex-wrap">
      <EcommerceComponent />
      <ServiceComponet />
      <ResturantComponent />
      <ResortComponent />
    </div>
  );
};

export default Home;
