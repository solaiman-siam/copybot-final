import Container from "../shared/Container";
import Copy from "../Copy";
import { CollapsAccordion } from "../faq/CollapsAccordion";
function Faq() {


  return (
    <div id="faq" className="lg:py-24 py-14 px-4 lg:px-6 2xl:px-0">
      <Container>
        <div>
         <Copy delay={0.3}>
           <h3 className="lg:text-4xl text-3xl text-center pb-10">Frequently Asked Questions</h3>
         </Copy>
        </div>
        <div className="max-w-[800px] mx-auto">
          <CollapsAccordion/>
        </div>
      </Container>
    </div>
  );
}

export default Faq;
