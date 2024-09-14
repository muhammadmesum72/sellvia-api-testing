import FAQComponent from "@/components/Faqs";
import Register from "@/components/Register";

export default function Home() {
  return (
    <div className="">
      <div className="p-4 font-bold text">Sellvia Api Testing</div>
      <div>
        <FAQComponent />
        <Register />
      </div>
    </div>
  );
}
