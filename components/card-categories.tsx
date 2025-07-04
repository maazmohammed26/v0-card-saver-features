"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { CreditCard, Tags, CreditCardIcon, Wallet, Gift, Landmark, Building } from "lucide-react"
import type { CardData } from "@/types/card"

interface CardCategoriesProps {
  cards: (CardData & { id: string })[]
}

export default function CardCategories({ cards }: CardCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Categorize cards
  const creditCards = cards.filter((card) => card.cardType === "credit")
  const debitCards = cards.filter((card) => card.cardType === "debit")
  const prepaidCards = cards.filter((card) => card.cardType === "prepaid")
  const giftCards = cards.filter((card) => card.cardType === "gift")
  const otherCards = cards.filter((card) => card.cardType === "other")

  // Group by bank
  const bankGroups = cards.reduce(
    (acc, card) => {
      const bankName = card.bankName || "Other"
      if (!acc[bankName]) {
        acc[bankName] = []
      }
      acc[bankName].push(card)
      return acc
    },
    {} as Record<string, (CardData & { id: string })[]>,
  )

  const categories = [
    {
      name: "Credit Cards",
      count: creditCards.length,
      icon: <CreditCard className="h-5 w-5" />,
      color: "from-blue-600 to-blue-800",
    },
    {
      name: "Debit Cards",
      count: debitCards.length,
      icon: <Wallet className="h-5 w-5" />,
      color: "from-green-600 to-green-800",
    },
    {
      name: "Prepaid Cards",
      count: prepaidCards.length,
      icon: <Gift className="h-5 w-5" />,
      color: "from-purple-600 to-purple-800",
    },
    {
      name: "Gift Cards",
      count: giftCards.length,
      icon: <Gift className="h-5 w-5" />,
      color: "from-pink-600 to-pink-800",
    },
    {
      name: "Other Cards",
      count: otherCards.length,
      icon: <CreditCardIcon className="h-5 w-5" />,
      color: "from-gray-600 to-gray-800",
    },
  ]

  const banks = Object.keys(bankGroups).map((bank) => ({
    name: bank,
    count: bankGroups[bank].length,
    icon: <Building className="h-5 w-5" />,
    color: "from-indigo-600 to-indigo-800",
  }))

  return (
    <Card className="light-mode-card">
      <div className="p-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center mb-6">
          <Tags className="mr-2 h-5 w-5" />
          <h3 className="text-xl font-bold light-mode-text">Card Categories</h3>
        </motion.div>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium mb-4 light-mode-text">By Type</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${category.color} rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all duration-300`}
                  onClick={() => setSelectedCategory(category.name)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-white/10 p-2 rounded-full mr-3">{category.icon}</div>
                      <div>
                        <h5 className="font-medium text-white">{category.name}</h5>
                        <p className="text-sm text-white/70">
                          {category.count} {category.count === 1 ? "card" : "cards"}
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">{category.count}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4 light-mode-text">By Bank</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {banks.map((bank, index) => (
                <motion.div
                  key={bank.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => setSelectedCategory(bank.name)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-white/10 p-2 rounded-full mr-3">
                        <Landmark className="h-5 w-5" />
                      </div>
                      <div>
                        <h5 className="font-medium text-white">{bank.name}</h5>
                        <p className="text-sm text-white/70">
                          {bank.count} {bank.count === 1 ? "card" : "cards"}
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">{bank.count}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 dark:bg-black/30 light:bg-gray-100 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium light-mode-text">{selectedCategory} Details</h4>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="dark:text-white/70 dark:hover:text-white light:text-gray-600 light:hover:text-gray-900"
                >
                  Close
                </button>
              </div>

              <div className="space-y-3">
                {selectedCategory === "Credit Cards" &&
                  creditCards.map((card, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between dark:bg-black/20 light:bg-white p-3 rounded-lg"
                    >
                      <div className="flex items-center">
                        <CreditCardIcon className="h-5 w-5 mr-3 text-blue-400" />
                        <div>
                          <div className="font-medium light-mode-text">{card.cardName}</div>
                          <div className="text-sm dark:text-white/70 light:text-gray-600">
                            **** **** **** {card.cardNumber.slice(-4)} • {card.issuer.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm light-mode-text">{card.bankName || "Unknown Bank"}</div>
                    </div>
                  ))}

                {selectedCategory === "Debit Cards" &&
                  debitCards.map((card, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between dark:bg-black/20 light:bg-white p-3 rounded-lg"
                    >
                      <div className="flex items-center">
                        <Wallet className="h-5 w-5 mr-3 text-green-400" />
                        <div>
                          <div className="font-medium light-mode-text">{card.cardName}</div>
                          <div className="text-sm dark:text-white/70 light:text-gray-600">
                            **** **** **** {card.cardNumber.slice(-4)} • {card.issuer.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm light-mode-text">{card.bankName || "Unknown Bank"}</div>
                    </div>
                  ))}

                {selectedCategory === "Prepaid Cards" &&
                  prepaidCards.map((card, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between dark:bg-black/20 light:bg-white p-3 rounded-lg"
                    >
                      <div className="flex items-center">
                        <Gift className="h-5 w-5 mr-3 text-purple-400" />
                        <div>
                          <div className="font-medium light-mode-text">{card.cardName}</div>
                          <div className="text-sm dark:text-white/70 light:text-gray-600">
                            **** **** **** {card.cardNumber.slice(-4)} • {card.issuer.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm light-mode-text">{card.bankName || "Unknown Bank"}</div>
                    </div>
                  ))}

                {selectedCategory === "Gift Cards" &&
                  giftCards.map((card, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between dark:bg-black/20 light:bg-white p-3 rounded-lg"
                    >
                      <div className="flex items-center">
                        <Gift className="h-5 w-5 mr-3 text-pink-400" />
                        <div>
                          <div className="font-medium light-mode-text">{card.cardName}</div>
                          <div className="text-sm dark:text-white/70 light:text-gray-600">
                            **** **** **** {card.cardNumber.slice(-4)} • {card.issuer.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm light-mode-text">{card.bankName || "Unknown Bank"}</div>
                    </div>
                  ))}

                {selectedCategory === "Other Cards" &&
                  otherCards.map((card, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between dark:bg-black/20 light:bg-white p-3 rounded-lg"
                    >
                      <div className="flex items-center">
                        <CreditCardIcon className="h-5 w-5 mr-3 text-gray-400" />
                        <div>
                          <div className="font-medium light-mode-text">{card.cardName}</div>
                          <div className="text-sm dark:text-white/70 light:text-gray-600">
                            **** **** **** {card.cardNumber.slice(-4)} • {card.issuer.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm light-mode-text">{card.bankName || "Unknown Bank"}</div>
                    </div>
                  ))}

                {bankGroups[selectedCategory]?.map((card, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between dark:bg-black/20 light:bg-white p-3 rounded-lg"
                  >
                    <div className="flex items-center">
                      <Building className="h-5 w-5 mr-3 text-indigo-400" />
                      <div>
                        <div className="font-medium light-mode-text">{card.cardName}</div>
                        <div className="text-sm dark:text-white/70 light:text-gray-600">
                          **** **** **** {card.cardNumber.slice(-4)} • {card.issuer.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm light-mode-text">
                      {card.cardType.charAt(0).toUpperCase() + card.cardType.slice(1)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  )
}
