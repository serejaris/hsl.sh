"use client"

import { AsciiFooter } from "./ascii-footer"
import { GlitchTextPink } from "./glitch-text-pink"

const benefits = [
  "первые 50 участников: FREE",
  "после 50: 999₽",
  "гайд по вайбкодингу для старта",
  "все инструкции и материалы",
  "статус участника хакатона в @vibecod3rs",
  "воркшопы: от идеи до продукта",
  "поддержка в чате хакатона",
  "за 1 место - факультет vibecoding.phd + AI Pro",
]

export function RegistrationSection() {
  return (
    <section id="registration" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-primary font-mono text-sm">$</span>
              <h2 className="text-lg sm:text-2xl md:text-4xl font-bold font-mono break-words">
                <GlitchTextPink text="./register.sh --start" />
              </h2>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-mono ml-5 break-words">
              регистрируйся через telegram бот
            </p>
          </div>

          <div className="border border-primary/50 bg-card/50 p-4 sm:p-6 md:p-10">
            <div className="border border-[deeppink]/30 bg-[deeppink]/5 p-3 sm:p-4 mb-6">
              <div className="text-center space-y-2">
                <p className="text-[deeppink] font-mono text-xs sm:text-sm font-bold">
                  [ ОПЫТ В ПРОГРАММИРОВАНИИ НЕ НУЖЕН ]
                </p>
                <p className="text-muted-foreground font-mono text-[10px] sm:text-xs">
                  мы даем все: гайды, инструкции, воркшопы и поддержку в чате
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Benefits */}
              <div>
                <h3 className="text-base sm:text-lg font-bold font-mono mb-4 text-accent break-words">
                  что_получишь.txt:
                </h3>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs sm:text-sm font-mono">
                      <span className="text-primary flex-shrink-0">&gt;</span>
                      {benefit.includes("vibecoding.phd") ? (
                        <span className="text-muted-foreground break-words">
                          за 1 место - факультет{" "}
                          <a
                            href="https://vibecoding.phd"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:text-[deeppink] transition-colors"
                          >
                            vibecoding.phd
                          </a>{" "}
                          + AI Pro
                        </span>
                      ) : benefit.includes("@vibecod3rs") ? (
                        <span className="text-muted-foreground break-words">
                          статус участника хакатона в{" "}
                          <a
                            href="https://t.me/vibecod3rs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:text-[deeppink] transition-colors"
                          >
                            @vibecod3rs
                          </a>
                        </span>
                      ) : (
                        <span className="text-muted-foreground break-words">{benefit}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Registration CTA */}
              <div className="flex flex-col justify-center space-y-4">
                <div className="border border-accent/30 bg-accent/5 p-4 sm:p-6">
                  <div className="text-center space-y-4">
                    <div className="text-3xl">📱</div>
                    <h4 className="text-base sm:text-lg font-bold font-mono break-words">telegram_bot</h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-mono break-words">
                      нажми для регистрации
                    </p>
                    <a
                      href="https://t.me/hashslash_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-primary text-primary-foreground px-4 sm:px-6 py-3 font-mono text-xs sm:text-sm hover:bg-[deeppink] transition-colors text-center break-words"
                    >
                      <GlitchTextPink text="[ОТКРЫТЬ БОТА]" className="justify-center" />
                    </a>
                  </div>
                </div>

                <p className="text-[10px] sm:text-xs text-center text-muted-foreground font-mono break-words">
                  после регистрации: гайд + инструкции + доступ в чат
                </p>

                <div className="border border-accent/20 bg-accent/5 p-3 sm:p-4">
                  <div className="flex gap-2 text-[10px] sm:text-xs font-mono">
                    <span className="text-primary flex-shrink-0">&gt;</span>
                    <p className="text-muted-foreground break-words">
                      статус участника:{" "}
                      <a
                        href="https://t.me/vibecod3rs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-[deeppink] transition-colors"
                      >
                        @vibecod3rs
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 md:mt-24 border-t border-border pt-8 pb-8">
        <div className="container mx-auto px-4">
          <AsciiFooter />
        </div>
      </footer>
    </section>
  )
}
