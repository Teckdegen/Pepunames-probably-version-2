
export function Features() {
  const features = [
    {
      title: "Unique Identity",
      description: "Own a unique .pepu domain that's yours forever on the blockchain",
      icon: "🆔"
    },
    {
      title: "Easy Transfers",
      description: "Receive payments with a memorable domain instead of a complex address",
      icon: "💸"
    },
    {
      title: "Web3 Ready",
      description: "Connect to dApps and services using your .pepu domain",
      icon: "🌐"
    },
    {
      title: "Decentralized",
      description: "Built on PEPU network for true ownership and security",
      icon: "🔐"
    }
  ];

  return (
    <section id="features" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose a .pepu Domain?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your gateway to a decentralized digital identity on the PEPU network
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-6 rounded-lg text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-terminal-deep-purple">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
