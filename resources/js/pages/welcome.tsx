import { Head } from '@inertiajs/react';
import BeeJourney from '@/components/honey/bee-journey';
import FlowerHero from '@/components/honey/flower-hero';
import Footer from '@/components/honey/footer';
import HoneyExtraction from '@/components/honey/honey-extraction';
import HoneycombScene from '@/components/honey/honeycomb-scene';
import JarFilling from '@/components/honey/jar-filling';
import JourneyRail from '@/components/honey/journey-rail';
import Navbar from '@/components/honey/navbar';
import ProductReveal from '@/components/honey/product-reveal';

export default function Welcome() {
    return (
        <>
            <Head title="From Blossom to Bottle">
                <meta
                    name="description"
                    content="Golden Hive — follow a single bee from the flower garden to a jar of pure, raw honey."
                />
            </Head>
            <div className="bg-[#fff8e6] font-sans text-comb">
                <Navbar />
                <JourneyRail />
                <main>
                    <FlowerHero />
                    <BeeJourney />
                    <HoneycombScene />
                    <HoneyExtraction />
                    <JarFilling />
                    <ProductReveal />
                </main>
                <Footer />
            </div>
        </>
    );
}
