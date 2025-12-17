
function HomePage() {
  return (
    <section className="flex justify-center px-4 mt-14">
      <div className="w-full max-w-4xl text-center space-y-6">
        
        <h2 className="text-4xl font-bold tracking-tight">
          Merhaba, ben Başak Tepe.
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Kişisel web siteme hoş geldiniz. Burada geliştirdiğim projeleri,
          teknik yetkinliklerimi, kariyer yolculuğumu inceleyebilirsiniz.
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed" >Herhangi bir sorunuz olursa linkedin üzerinden veya Bana Ulaş kısmından ulaşabilirsiniz. </p>

        <div className="flex justify-center">
          <span className="h-px w-24 bg-muted" />
        </div>

      </div>
    </section>
  );
}

export default HomePage;
