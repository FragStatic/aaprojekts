import cardData from "../../data/cardData.json";

export default function About() {
  return (
    <section className="px-40 pb-40 pt-12">
      <div>
        <div className="mb-12">
          <h1 className="text-4xl">Front-end programmetājs</h1>
          <h2 className="text-3xl">Hugo Lipko</h2>
        </div>
        <div className="inline-flex w-full justify-evenly max-h-80">
          {cardData.map((data) => (
            <div className="flex flex-col w-60 h-80 border border-primary rounded-md">
              <div className="flex bg-primary h-16 rounded-t-md align-center w-full px-4">
                <span className="text-3xl p-4 text-white">{data.title}</span>
              </div>
              <div className="h-full bg-secondary overflow-hidden">
                <p className="p-4">{data.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
