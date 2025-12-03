import { Product } from "@/types/product";

// Helper function to convert Google Drive URLs to direct image URLs
const convertDriveUrl = (url: string): string => {
  if (url.includes('drive.google.com')) {
    const fileIdMatch = url.match(/[?&]id=([^&]+)/);
    if (fileIdMatch) {
      // Using Google's content delivery URL which is more reliable
      return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
    }
  }
  return url;
};

const shopData: Product[] = [
  // {
  //   title: "Golden Penny Spaghetti",
  //   reviews: 15,
  //   price: 55799.0,
  //   discountedPrice: 25799.0,
  //   id: 1,
  //   imgs: {
  //     thumbnails: [
  //       "/images/products/product-1-bg-1.png",
  //       "/images/products/product-1-bg-1.png",
  //     ],
  //     previews: [
  //       "/images/products/product-1-bg-1.png",
  //       "/images/products/product-1-bg-1.png",
  //     ],
  //   },
  // },
  // {
  //   title: "Dangote Refined Sugar",
  //   reviews: 5,
  //   price: 89999.0,
  //   discountedPrice: 59999.0,
  //   id: 2,
  //   imgs: {
  //     thumbnails: [
  //       "/images/products/product-2-bg-1.png",
  //       "/images/products/product-2-bg-1.png",
  //     ],
  //     previews: [
  //       "/images/products/product-2-bg-1.png",
  //       "/images/products/product-2-bg-1.png",
  //     ],
  //   },
  // },
  {
    title: "House of Diddy Fascinator",
    reviews: 5,
    price: 55799.0,
    discountedPrice: 25799.0,
    id: 3,
    imgs: {
      thumbnails: [
        "/images/products/product-3-bg-1.png",
        "/images/products/product-3-bg-1.png",
      ],
      previews: [
        "/images/products/product-3-bg-1.png",
        "/images/products/product-3-bg-1.png",
      ],
    },
  },
 
  {
    title: "Triumph Global Concept HalfCast Lotion",
    reviews: 15,
    price: 17500.0,
    discountedPrice: 17500.0,
    id: 4,
    imgs: {
      thumbnails: [
        "/images/products/lotion.png",
        "/images/products/lotion.png",
      ],
      previews: [
        "/images/products/lotion.png",
        "/images/products/lotion.png",
      ],
    },
  },
  {
    title: "ELIM-BLISS PERFUME - 3ml",
    reviews: 0,
    price: 800.0,
    discountedPrice: 600.0,
    id: 5,
    imgs: {
      thumbnails: [
        "/images/products/3ml.png",
      ],
      previews: [
        "/images/products/3ml.png",
      ],
    },
  },
  {
    title: "ELIM-BLISS PERFUME - 6ml",
    reviews: 0,
    price: 1500.0,
    discountedPrice: 1200.0,
    id: 6,
    imgs: {
      thumbnails: [
        "/images/products/3ml.png",
      ],
      previews: [
        "/images/products/3ml.png",
      ],
    },
  },
  {
    title: "ELIM-BLISS PERFUME - 10ml",
    reviews: 0,
    price: 3000.0,
    discountedPrice: 2400.0,
    id: 7,
    imgs: {
      thumbnails: [
        "/images/products/10ml.png",
      ],
      previews: [
        "/images/products/10ml.png",
      ],
    },
  },
  {
    title: "ELIM-BLISS PERFUME - 30ml",
    reviews: 0,
    price: 7000.0,
    discountedPrice: 6000.0,
    id: 8,
    imgs: {
      thumbnails: [
        "/images/products/30ml.png",
      ],
      previews: [
        "/images/products/30ml.png",
      ],
    },
  },
  {
    title: "CHIBEL BEDDINGS",
    reviews: 0,
    price: 25000.0,
    discountedPrice: 20000.0,
    id: 9,
    imgs: {
      thumbnails: [
        "/images/products/bedding.png",
      ],
      previews: [
        "/images/products/bedding.png",
      ],
    },
  },
  {
    title: "CeeJay's Fashion Hub - Pams, Handbags & Crossbags",
    reviews: 0,
    price: 25000.0,
    discountedPrice: 15000.0,
    id: 10,
    imgs: {
      thumbnails: [
        "/images/products/pams.png",
      ],
      previews: [
        "/images/products/pams.png",
      ],
    },
  },
  {
    title: "Black Diamond Collections - Fashion Wears & Accessories",
    reviews: 0,
    price: 25000.0,
    discountedPrice: 18000.0,
    id: 11,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1cK77xYWPNpae6LvgiW2-Q4qfo1z9qriW",
        "https://drive.google.com/uc?export=view&id=1cK77xYWPNpae6LvgiW2-Q4qfo1z9qriW",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1cK77xYWPNpae6LvgiW2-Q4qfo1z9qriW",
      ],
    },
  },
  {
    title: "Chamberlain Interbiz Resources - Engine Spare Parts",
    reviews: 0,
    price: 45000.0,
    discountedPrice: 20000.0,
    id: 12,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1_5yppP3a5fo7j7XoKkPmv3-0JXO98REc",
        "https://drive.google.com/uc?export=view&id=1_5yppP3a5fo7j7XoKkPmv3-0JXO98REc",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1_5yppP3a5fo7j7XoKkPmv3-0JXO98REc",
      ],
    },
  },
  {
    title: "Annie Thrift Store - Thrift Clothing",
    reviews: 0,
    price: 5000.0,
    discountedPrice: 3000.0,
    id: 13,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1Qkolr5EQ64yV6XTtcCjS_vDiMb9GHdMs",
        "https://drive.google.com/uc?export=view&id=1Nh4jYRLG3G_7vNY-On2TyY42OUQMrxwo",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1Qkolr5EQ64yV6XTtcCjS_vDiMb9GHdMs",
        "https://drive.google.com/uc?export=view&id=1Nh4jYRLG3G_7vNY-On2TyY42OUQMrxwo",
        "https://drive.google.com/uc?export=view&id=1Az59H52C-t9yMaonSGwiuIinFRM5cioM",
        "https://drive.google.com/uc?export=view&id=1-6YwbHtGx-Z7r_Gx2tJlwaj7MFBOxaL4",
        "https://drive.google.com/uc?export=view&id=1-ltavpT0ZzvhzEBPa8dlGLUHO7x90gCV",
        "https://drive.google.com/uc?export=view&id=1JA0vLOz6ADCSYAI-qbq5z9Y-SZTXynVA",
        "https://drive.google.com/uc?export=view&id=1XsHguWObIMz7hCXy5HOcUa5xZapRWAoi",
        "https://drive.google.com/uc?export=view&id=1nJ2rSSIIdwW89XJKho95smwQbosmHO2Z",
        "https://drive.google.com/uc?export=view&id=1PIL6RmVNImgbwDUyPPN60yXvOOXAguNd",
        "https://drive.google.com/uc?export=view&id=1Y7qAZ_yiKtyYf4HsHvbDVTDqKiJ0LMIv",
      ],
    },
  },
  {
    title: "D and C Communications - 60000mah Oraimo Power Bank",
    reviews: 0,
    price: 85000.0,
    discountedPrice: 75000.0,
    id: 14,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1BmUOTSIwpMTEzQfkK6jNuoCSKtbZ6tRb",
        "https://drive.google.com/uc?export=view&id=1BmUOTSIwpMTEzQfkK6jNuoCSKtbZ6tRb",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1BmUOTSIwpMTEzQfkK6jNuoCSKtbZ6tRb",
      ],
    },
  },
  {
    title: "Tishey Food Cart - Beans Powder, Tapioca, Crayfish",
    reviews: 0,
    price: 6000.0,
    discountedPrice: 4500.0,
    id: 15,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1E7DPXS4oMcwBdnBJ27nv9aVsrK4SJmzK",
        "https://drive.google.com/uc?export=view&id=1sNoTes2x3BkZvcANwt5ZIZk4U_XRi-Za",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1E7DPXS4oMcwBdnBJ27nv9aVsrK4SJmzK",
        "https://drive.google.com/uc?export=view&id=1sNoTes2x3BkZvcANwt5ZIZk4U_XRi-Za",
        "https://drive.google.com/uc?export=view&id=1kpH4DmwCjLq0jgRSYDK4guk9zXgSi1a3",
        "https://drive.google.com/uc?export=view&id=12BdXfE1ytaiQ0xM1e6k5tN2xyxfh-GEm",
        "https://drive.google.com/uc?export=view&id=1S5QaHx0GHHxXVbslM-WOfdqSc9BcucYg",
        "https://drive.google.com/uc?export=view&id=1wfCLiWrC8cCBE-RvVCKa98Q8sn_0PLP7",
      ],
    },
  },
  {
    title: "Ives Treat n Surprises - Cakes and Pastries",
    reviews: 0,
    price: 35000.0,
    discountedPrice: 25000.0,
    id: 16,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1cG1OOzOG41Wst5WR_bg1fHHBg0P7Rqq9",
        "https://drive.google.com/uc?export=view&id=1mr7CtLhlytHF0ENlUX1gXX4YDrabe_qC",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1cG1OOzOG41Wst5WR_bg1fHHBg0P7Rqq9",
        "https://drive.google.com/uc?export=view&id=1mr7CtLhlytHF0ENlUX1gXX4YDrabe_qC",
        "https://drive.google.com/uc?export=view&id=1TyKjJxzmW-ujAiA_ziluocOutJ2s5qd5",
      ],
    },
  },
  {
    title: "Unique Farms - Own Your Farm Investment",
    reviews: 0,
    price: 2000000.0,
    discountedPrice: 2000000.0,
    id: 17,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1dpTKdB9ze0ONlwahDzgkwcSznWiclx1D",
        "https://drive.google.com/uc?export=view&id=1dpTKdB9ze0ONlwahDzgkwcSznWiclx1D",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1dpTKdB9ze0ONlwahDzgkwcSznWiclx1D",
      ],
    },
  },
  {
    title: "Fabrics Fusion - Fabrics",
    reviews: 0,
    price: 10000.0,
    discountedPrice: 1000.0,
    id: 18,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1Ia1EVTNctWs9uQBYdQXL94BZ3j2Kbaat",
        "https://drive.google.com/uc?export=view&id=1zHRTTLf9rYi9Xn-cRV-yromX2LC2FZtn",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1Ia1EVTNctWs9uQBYdQXL94BZ3j2Kbaat",
        "https://drive.google.com/uc?export=view&id=1zHRTTLf9rYi9Xn-cRV-yromX2LC2FZtn",
        "https://drive.google.com/uc?export=view&id=13_nYN20bah9CL5n0yDA-5IsxfUTtmrKE",
        "https://drive.google.com/uc?export=view&id=1VpOBq8frffRIA2NT_IhSsaB0Il5aMDr2",
        "https://drive.google.com/uc?export=view&id=1kt1kOEqvt2QKfEafuGBsgPiQTyOqT47C",
        "https://drive.google.com/uc?export=view&id=1T-ZgFZpCHYT9msLYSPswiy4TWjoWeYe_",
        "https://drive.google.com/uc?export=view&id=1Wj0pPbcX6yfKRs8BEUG4wtMJH2rAAmdV",
        "https://drive.google.com/uc?export=view&id=124eF9qLeZX3eKcewPE3b2MlYaNiuVINH",
      ],
    },
  },
  {
    title: "Solomorals Enterprises - Cocoyam Flour",
    reviews: 0,
    price: 1000.0,
    discountedPrice: 800.0,
    id: 19,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1hAB7D1E_cB90nshaKguZA0UJ2Pv2upJK",
        "https://drive.google.com/uc?export=view&id=1hAB7D1E_cB90nshaKguZA0UJ2Pv2upJK",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1hAB7D1E_cB90nshaKguZA0UJ2Pv2upJK",
      ],
    },
  },
  {
    title: "K•aced - Colorful Patterned & Customized Gadget Pouches",
    reviews: 0,
    price: 7000.0,
    discountedPrice: 5500.0,
    id: 20,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1JCb9xZdG8FaBKtTgoDR2IMr7STvlwCfD",
        "https://drive.google.com/uc?export=view&id=1py2jLziF37GS1J5lqOKIvkd1HnCKtzwX",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1JCb9xZdG8FaBKtTgoDR2IMr7STvlwCfD",
        "https://drive.google.com/uc?export=view&id=1py2jLziF37GS1J5lqOKIvkd1HnCKtzwX",
        "https://drive.google.com/uc?export=view&id=1-c_3ZuWfIZLEoASnMYFTXcETtVxhQ1vZ",
        "https://drive.google.com/uc?export=view&id=1acA5iisgoLRuS7P2JW-lfy-9qK1YfrOa",
        "https://drive.google.com/uc?export=view&id=1Mh4XoNQdgKLADFrFpysOleuM1ivme-sZ",
        "https://drive.google.com/uc?export=view&id=1EP8bfNAxr1KTaYrfK5EPykqfI1SHrrNp",
        "https://drive.google.com/uc?export=view&id=1vcWj9wIb9EaOs_zM2sty3Xq3_ClO6cEN",
        "https://drive.google.com/uc?export=view&id=1gHyRNbSPx5uk_XYvxS0-Vs5M5KaKCK0A",
        "https://drive.google.com/uc?export=view&id=1eGXKxEk-yNggkn_cgdX9TvepMSNDU7HW",
      ],
    },
  },
  {
    title: "Gombe Primary Health - Drugs and Consumables",
    reviews: 0,
    price: 700.0,
    discountedPrice: 560.0,
    id: 21,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1RA_aTzvfcoBslT0BkNXDlT_XcmNFo335",
        "https://drive.google.com/uc?export=view&id=1RA_aTzvfcoBslT0BkNXDlT_XcmNFo335",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1RA_aTzvfcoBslT0BkNXDlT_XcmNFo335",
      ],
    },
  },
  {
    title: "Eme Project Management - Construction Materials",
    reviews: 0,
    price: 120000.0,
    discountedPrice: 100000.0,
    id: 22,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1YTFPloH746T0u2jW--xtLbH1x6Z7Q0Uq",
        "https://drive.google.com/uc?export=view&id=1YTFPloH746T0u2jW--xtLbH1x6Z7Q0Uq",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1YTFPloH746T0u2jW--xtLbH1x6Z7Q0Uq",
      ],
    },
  },
  {
    title: "Ajebo Fashion Success - Ready Made Female Clothes, Shoes, Bags",
    reviews: 0,
    price: 12000.0,
    discountedPrice: 9000.0,
    id: 23,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1tOFO3hsGQr8MwXtyZrYXpD_rH9IFr3q5",
        "https://drive.google.com/uc?export=view&id=1tOFO3hsGQr8MwXtyZrYXpD_rH9IFr3q5",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1tOFO3hsGQr8MwXtyZrYXpD_rH9IFr3q5",
      ],
    },
  },
  {
    title: "Tallest Mini Tetlow Electricals - Everything Electricals",
    reviews: 0,
    price: 6000.0,
    discountedPrice: 5000.0,
    id: 24,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1ZYfCKd6e2bO5OrD3v2J1rCYLBa2g8AGL",
        "https://drive.google.com/uc?export=view&id=1ZYfCKd6e2bO5OrD3v2J1rCYLBa2g8AGL",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1ZYfCKd6e2bO5OrD3v2J1rCYLBa2g8AGL",
      ],
    },
  },
  {
    title: "Shop123k - Home and Kitchen Appliances",
    reviews: 0,
    price: 5000.0,
    discountedPrice: 3999.0,
    id: 25,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1h5lZnKMa7WPC0Ol4TlfptWzVpHVPkJxj",
        "https://drive.google.com/uc?export=view&id=18b_QdHhyS39__zMSucSbtQe6IiOnqW7P",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1h5lZnKMa7WPC0Ol4TlfptWzVpHVPkJxj",
        "https://drive.google.com/uc?export=view&id=18b_QdHhyS39__zMSucSbtQe6IiOnqW7P",
        "https://drive.google.com/uc?export=view&id=1Y774jJBbdh8gE6l3VvLVwPEXmmKMmums",
        "https://drive.google.com/uc?export=view&id=1TXY5ZPB5mLNWM45ROjBmHZLdx50Cphl4",
      ],
    },
  },
  {
    title: "Gabby's Beauty-Hub - Perfumes",
    reviews: 0,
    price: 100000.0,
    discountedPrice: 5000.0,
    id: 26,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1K_NAMfWf2KKd2TgcVQXeHROBLYpr168Y",
        "https://drive.google.com/uc?export=view&id=1dnnnpLtL4hTkI_BGPo8ns5wCQ-tLiD0K",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1K_NAMfWf2KKd2TgcVQXeHROBLYpr168Y",
        "https://drive.google.com/uc?export=view&id=1dnnnpLtL4hTkI_BGPo8ns5wCQ-tLiD0K",
        "https://drive.google.com/uc?export=view&id=1bDJjkatunUzS5R4XwpTTfsdpYL1fklrw",
        "https://drive.google.com/uc?export=view&id=1u7CkrAOuSFCGZkF5jn_oW_g_GDbk4XOC",
        "https://drive.google.com/uc?export=view&id=1XjVoZ_zpw4t2E4nR_UIZZylOUWNrWowe",
        "https://drive.google.com/uc?export=view&id=1CdqKjQpuX5JYhlYdYETKnupPfrXJfvNJ",
      ],
    },
  },
  {
    title: "Nonso Enterprise - Night Wears",
    reviews: 0,
    price: 18000.0,
    discountedPrice: 15000.0,
    id: 27,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1RIJQia0JMQ1gqr-XWxmbuk4NiwQnALyZ",
        "https://drive.google.com/uc?export=view&id=1RIJQia0JMQ1gqr-XWxmbuk4NiwQnALyZ",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1RIJQia0JMQ1gqr-XWxmbuk4NiwQnALyZ",
      ],
    },
  },
  {
    title: "T.GOD Investment - Oraimo 30,000mah Power Bank",
    reviews: 0,
    price: 35000.0,
    discountedPrice: 29000.0,
    id: 28,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1qS_vGBJzubmvV7nneDf5wB7RZOos60VR",
        "https://drive.google.com/uc?export=view&id=184Zkni-gwjXIqAIVaUm8elYMA1hpQjdG",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1qS_vGBJzubmvV7nneDf5wB7RZOos60VR",
        "https://drive.google.com/uc?export=view&id=184Zkni-gwjXIqAIVaUm8elYMA1hpQjdG",
        "https://drive.google.com/uc?export=view&id=1WhJx5JnquZt-xyRXetHsO_vHTrjgSjlb",
        "https://drive.google.com/uc?export=view&id=1Q2KkNHPl9VtyTBOTAeID9edq4LtY6iOD",
      ],
    },
  },
  {
    title: "Chiavila and Wears - Shoes, Clothes & Skincare",
    reviews: 0,
    price: 30000.0,
    discountedPrice: 18000.0,
    id: 29,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1QYS6RwOtkrOBQ0z-ToMqRCHGR2Oc5um6",
        "https://drive.google.com/uc?export=view&id=1Bb9-x6kPUCjN4jJpcag3kiNoAGohGbzV",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1QYS6RwOtkrOBQ0z-ToMqRCHGR2Oc5um6",
        "https://drive.google.com/uc?export=view&id=1Bb9-x6kPUCjN4jJpcag3kiNoAGohGbzV",
        "https://drive.google.com/uc?export=view&id=1B6FMUpTjkzwh2tj2j2ai89nTaEu8upF2",
        "https://drive.google.com/uc?export=view&id=1qTEtbpVmzw0FO04-3T7M9PggpwJpgqHz",
      ],
    },
  },
  {
    title: "Gratiphy Vogue - Spell Nigeria Card Game (2nd Edition)",
    reviews: 0,
    price: 35000.0,
    discountedPrice: 30000.0,
    id: 30,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1dJh34lDUf_0LzucdWNe6IpDoV7E9HqhZ",
        "https://drive.google.com/uc?export=view&id=1H4oRkdD3oqoyTNcJzZya10u3VOao20iz",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1dJh34lDUf_0LzucdWNe6IpDoV7E9HqhZ",
        "https://drive.google.com/uc?export=view&id=1H4oRkdD3oqoyTNcJzZya10u3VOao20iz",
        "https://drive.google.com/uc?export=view&id=1k6MILsNQTGBZg2rnzlqbabjvrSqlT2Wq",
      ],
    },
  },
  {
    title: "Happy Joe Studios - Photo Shoot",
    reviews: 0,
    price: 15000.0,
    discountedPrice: 10000.0,
    id: 31,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1QnQuKT6wgmEBzMmFepTIym7G8uoWf9XT",
        "https://drive.google.com/uc?export=view&id=1cE4EMxBGg69_4UjX2QMmJYWahCd8s0xs",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1QnQuKT6wgmEBzMmFepTIym7G8uoWf9XT",
        "https://drive.google.com/uc?export=view&id=1cE4EMxBGg69_4UjX2QMmJYWahCd8s0xs",
        "https://drive.google.com/uc?export=view&id=1z8akmbyZ-fVoO5qy5hROLfFxri9HzRpc",
        "https://drive.google.com/uc?export=view&id=1PYvmeAROZNyKrzG7t1XgdBqpV6-2ZVqn",
        "https://drive.google.com/uc?export=view&id=16-IepCVK0NPpTsAsg2IJ4865VmSvs4iN",
        "https://drive.google.com/uc?export=view&id=1Sm33_3iVpMbIquTIREpaO1eAtqNeox13",
        "https://drive.google.com/uc?export=view&id=1g29FURZYD3LpGIjmAIB-Wr_Cw4w-dSTt",
      ],
    },
  },
  {
    title: "Livy's Cup - Bottled Chapman",
    reviews: 0,
    price: 1500.0,
    discountedPrice: 1000.0,
    id: 32,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1gGtrGyY6yRadhcfeOrUFpwFAHheuYJvn",
        "https://drive.google.com/uc?export=view&id=1And-32_MX8_ibPX-F1qVFYkSY7TKfRu_",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1gGtrGyY6yRadhcfeOrUFpwFAHheuYJvn",
        "https://drive.google.com/uc?export=view&id=1And-32_MX8_ibPX-F1qVFYkSY7TKfRu_",
        "https://drive.google.com/uc?export=view&id=11J2k_WaIjXVaEFQwH7RmLGxynNm5MH6e",
        "https://drive.google.com/uc?export=view&id=1_f2Zo9BK14tk7UmIJo_c9x_rEl5e_kAG",
      ],
    },
  },
  {
    title: "Livy's Cup - Mocktail Drink",
    reviews: 0,
    price: 10000.0,
    discountedPrice: 8000.0,
    id: 33,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1gGtrGyY6yRadhcfeOrUFpwFAHheuYJvn",
        "https://drive.google.com/uc?export=view&id=1And-32_MX8_ibPX-F1qVFYkSY7TKfRu_",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1gGtrGyY6yRadhcfeOrUFpwFAHheuYJvn",
        "https://drive.google.com/uc?export=view&id=1And-32_MX8_ibPX-F1qVFYkSY7TKfRu_",
        "https://drive.google.com/uc?export=view&id=11J2k_WaIjXVaEFQwH7RmLGxynNm5MH6e",
        "https://drive.google.com/uc?export=view&id=1_f2Zo9BK14tk7UmIJo_c9x_rEl5e_kAG",
      ],
    },
  },
  {
    title: "Thechinchingirl - Chin Chin Pouch",
    reviews: 0,
    price: 3000.0,
    discountedPrice: 2500.0,
    id: 34,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1TC5zmq7ZUslmnPZ_kXaaKdFAfeRpC9BG",
        "https://drive.google.com/uc?export=view&id=1lnTZWiZ0FPI4efFVNeql4vcDCnvt-qzD",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1TC5zmq7ZUslmnPZ_kXaaKdFAfeRpC9BG",
        "https://drive.google.com/uc?export=view&id=1lnTZWiZ0FPI4efFVNeql4vcDCnvt-qzD",
        "https://drive.google.com/uc?export=view&id=1kdTN_ENGUgWxZjiTdgeXxiiubV45AkvZ",
        "https://drive.google.com/uc?export=view&id=1n8srjdJsIBZ-jY-nQmoZNlG8N7rKvEpD",
      ],
    },
  },
  {
    title: "Thechinchingirl - Chin Chin Jar",
    reviews: 0,
    price: 7000.0,
    discountedPrice: 5000.0,
    id: 35,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1TC5zmq7ZUslmnPZ_kXaaKdFAfeRpC9BG",
        "https://drive.google.com/uc?export=view&id=1lnTZWiZ0FPI4efFVNeql4vcDCnvt-qzD",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1TC5zmq7ZUslmnPZ_kXaaKdFAfeRpC9BG",
        "https://drive.google.com/uc?export=view&id=1lnTZWiZ0FPI4efFVNeql4vcDCnvt-qzD",
        "https://drive.google.com/uc?export=view&id=1kdTN_ENGUgWxZjiTdgeXxiiubV45AkvZ",
        "https://drive.google.com/uc?export=view&id=1n8srjdJsIBZ-jY-nQmoZNlG8N7rKvEpD",
      ],
    },
  },
  {
    title: "Ibk Wine - Wines and Whiskey",
    reviews: 0,
    price: 15000.0,
    discountedPrice: 12000.0,
    id: 36,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1yv6xS6KyWslI6sRmycn0Ga_V8H9bFK3i",
        "https://drive.google.com/uc?export=view&id=1yv6xS6KyWslI6sRmycn0Ga_V8H9bFK3i",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1yv6xS6KyWslI6sRmycn0Ga_V8H9bFK3i",
      ],
    },
  },
  {
    title: "ETZVERSATILE - iPhone 12 Pro Max",
    reviews: 0,
    price: 400000.0,
    discountedPrice: 350000.0,
    id: 37,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1PqaPv9rzWiUeYaq7HKhdcLbAl8fd-TXq",
        "https://drive.google.com/uc?export=view&id=1PqaPv9rzWiUeYaq7HKhdcLbAl8fd-TXq",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1PqaPv9rzWiUeYaq7HKhdcLbAl8fd-TXq",
      ],
    },
  },
  {
    title: "Ree'shairven - Closure Wigs",
    reviews: 0,
    price: 10000.0,
    discountedPrice: 7000.0,
    id: 38,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1NnPGWRJKLCadaWlrU6rE6kXPJ5Lga3hf",
        "https://drive.google.com/uc?export=view&id=1ueAldcrUWdFIa8QctGBuJN5TVNBSwKMe",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1NnPGWRJKLCadaWlrU6rE6kXPJ5Lga3hf",
        "https://drive.google.com/uc?export=view&id=1ueAldcrUWdFIa8QctGBuJN5TVNBSwKMe",
        "https://drive.google.com/uc?export=view&id=1dHfFP7BKAPO2cGbyEz3KfAzG6G89N3Nc",
      ],
    },
  },
  {
    title: "Benue Local Rice - 50kg",
    reviews: 0,
    price: 45000.0,
    discountedPrice: 40000.0,
    id: 39,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1IB12pE9c22RmZv6k05cuUWBYViN_gcI6",
        "https://drive.google.com/uc?export=view&id=1IB12pE9c22RmZv6k05cuUWBYViN_gcI6",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1IB12pE9c22RmZv6k05cuUWBYViN_gcI6",
      ],
    },
  },
  {
    title: "Oic Ameke - Nigerian MBF Wood",
    reviews: 0,
    price: 35000.0,
    discountedPrice: 28000.0,
    id: 40,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1KEn1vISS-uu6uyCgECmqNTmqKa9IQpIH",
        "https://drive.google.com/uc?export=view&id=1KEn1vISS-uu6uyCgECmqNTmqKa9IQpIH",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1KEn1vISS-uu6uyCgECmqNTmqKa9IQpIH",
      ],
    },
  },
  {
    title: "Eko Explorers - Tourism Services",
    reviews: 0,
    price: 45000.0,
    discountedPrice: 35000.0,
    id: 41,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1Cf3vJoa0QJlhF_c4O2M2AYFvUjxew_YS",
        "https://drive.google.com/uc?export=view&id=1pWNONVNlVGozCYKV_l8X_2OwQajBRuN6",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1Cf3vJoa0QJlhF_c4O2M2AYFvUjxew_YS",
        "https://drive.google.com/uc?export=view&id=1pWNONVNlVGozCYKV_l8X_2OwQajBRuN6",
        "https://drive.google.com/uc?export=view&id=1QxYq3hTKEONeB-N1wFW2js-seT0la0Fo",
        "https://drive.google.com/uc?export=view&id=14kbU1UlFOZinBLum9jkMJz_iSA8wvUnQ",
        "https://drive.google.com/uc?export=view&id=1-w9fYntq780vE8ovjEi69rSfN9xkOrWP",
        "https://drive.google.com/uc?export=view&id=1vmh1tgMADG32CedoQb8HzCDw5vcr36aO",
        "https://drive.google.com/uc?export=view&id=1Y0e4cg4RWt5BxJRPVi_ecM0XWgEpKyt-",
      ],
    },
  },
  {
    title: "Amyx Foods - Oat Flour",
    reviews: 0,
    price: 6000.0,
    discountedPrice: 5000.0,
    id: 42,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1DTnirG61Z8BOBqicc8MfyHAiBSCVavKY",
        "https://drive.google.com/uc?export=view&id=1c29hk4s2uqs7V30JxoUaxxc8_p9l7iuN",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1DTnirG61Z8BOBqicc8MfyHAiBSCVavKY",
        "https://drive.google.com/uc?export=view&id=1c29hk4s2uqs7V30JxoUaxxc8_p9l7iuN",
        "https://drive.google.com/uc?export=view&id=1QA2o2O28VXKlJu5zqv2cEWfN4Glcj4tJ",
        "https://drive.google.com/uc?export=view&id=1qPD41-gHdanhdQU9QjUGHQ_CsS1ML0_s",
      ],
    },
  },
  {
    title: "Blessed Designs - Vintage 3-yards Fabric",
    reviews: 0,
    price: 2500.0,
    discountedPrice: 1800.0,
    id: 43,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=17EPkYWA2Hi2Kktctn3q7MKIsCQ2Blo-z",
        "https://drive.google.com/uc?export=view&id=17EPkYWA2Hi2Kktctn3q7MKIsCQ2Blo-z",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=17EPkYWA2Hi2Kktctn3q7MKIsCQ2Blo-z",
      ],
    },
  },
  {
    title: "Adorn by Tee - Engraved Jewelry",
    reviews: 0,
    price: 15000.0,
    discountedPrice: 11000.0,
    id: 44,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1UmSAid2LmelddokGT0mRutRJ32ibE_5u",
        "https://drive.google.com/uc?export=view&id=12k88qJu8dZGYPD-Qtr5KDt-kZuPnPaVz",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1UmSAid2LmelddokGT0mRutRJ32ibE_5u",
        "https://drive.google.com/uc?export=view&id=12k88qJu8dZGYPD-Qtr5KDt-kZuPnPaVz",
        "https://drive.google.com/uc?export=view&id=1upDodFuuW5cYK6J1DbwBMNyLybx1b2iz",
        "https://drive.google.com/uc?export=view&id=1HZh4Q0WBbxMzWmO21PkExkk23AmCF_0U",
        "https://drive.google.com/uc?export=view&id=1yFkmYHoFA0lU72MiY9ZSsQKXjF7ASKX_",
        "https://drive.google.com/uc?export=view&id=10s94MzokE8hvjU2xc8uO6ExQL787GcNU",
        "https://drive.google.com/uc?export=view&id=1a6NpYrs43biOe_OnehrRWnKsymFDAnB1",
      ],
    },
  },
  {
    title: "Dara Jewelry Brand - Chunky Bracelet, Necklace, Earrings",
    reviews: 0,
    price: 10000.0,
    discountedPrice: 7000.0,
    id: 45,
    imgs: {
      thumbnails: [
        "https://drive.google.com/uc?export=view&id=1hX_s7_Yljw8qxk5s3faZko3127k8xSwz",
        "https://drive.google.com/uc?export=view&id=1KtfOX1QDNpf5yR1huEeIXWCdObz6NtRN",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1hX_s7_Yljw8qxk5s3faZko3127k8xSwz",
        "https://drive.google.com/uc?export=view&id=1KtfOX1QDNpf5yR1huEeIXWCdObz6NtRN",
        "https://drive.google.com/uc?export=view&id=1ZLmmSbNeThg_CkHjYltwBXIMegWSsdrQ",
        "https://drive.google.com/uc?export=view&id=1S3oZitVX2QPDwhNuNrRaXfjO99ab99W3",
        "https://drive.google.com/uc?export=view&id=1C69FRakFQC44UiJKalTBBxEFQo-F90TL",
        "https://drive.google.com/uc?export=view&id=1Se_awGxTjr5sWISYt-JS0ZmO0XAGRt7m",
        "https://drive.google.com/uc?export=view&id=1EIksGVweLrZMXWSKw87EfQ3pJK2acOKM",
        "https://drive.google.com/uc?export=view&id=1H266cU3wJi1JPUVPwSehwCGxSpmJWRhm",
        "https://drive.google.com/uc?export=view&id=1pR2vmCXonnFz7RAVdzAdOlWdlnQSitac",
        "https://drive.google.com/uc?export=view&id=1hnLKngCB9ohfby5y3vXGTEyBkqvM5lnD",
      ],
    },
  },
];

export default shopData;
