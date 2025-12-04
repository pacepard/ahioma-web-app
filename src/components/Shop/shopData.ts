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
    title: "Thechinchingirl - Chin Chin Pouch",
    reviews: 0,
    price: 3000.0,
    discountedPrice: 2500.0,
    id: 34,
    imgs: {
      thumbnails: [
        "/images/products/pouch.png",
      ],
      previews: [
        "/images/products/pouch.png",
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
        "/images/products/chin.png",
      ],
      previews: [
        "/images/products/chin.png",
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
        "/images/products/model.png",
      ],
      previews: [
        "/images/products/model.png",
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
        "/images/products/gold.png",
      ],
      previews: [
        "/images/products/gold.png",
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
        "/images/products/diamond.png",
      ],
      previews: [
        "/images/products/diamond.png",
      ],
    },
  },
  // {
  //   title: "Chamberlain Interbiz Resources - Engine Spare Parts",
  //   reviews: 0,
  //   price: 45000.0,
  //   discountedPrice: 20000.0,
  //   id: 12,
  //   imgs: {
  //     thumbnails: [
  //       "https://drive.google.com/uc?export=view&id=1_5yppP3a5fo7j7XoKkPmv3-0JXO98REc",
  //       "https://drive.google.com/uc?export=view&id=1_5yppP3a5fo7j7XoKkPmv3-0JXO98REc",
  //     ],
  //     previews: [
  //       "https://drive.google.com/uc?export=view&id=1_5yppP3a5fo7j7XoKkPmv3-0JXO98REc",
  //     ],
  //   },
  // },
  {
    title: "Annie Thrift Store - Thrift Clothing",
    reviews: 0,
    price: 5000.0,
    discountedPrice: 3000.0,
    id: 13,
    imgs: {
      thumbnails: [
        "/images/products/thrift.png",
      ],
      previews: [
        "/images/products/thrift.png",
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
        "/images/products/power.png",
      ],
      previews: [
        "/images/products/power.png",
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
        "/images/products/cray.png",
      ],
      previews: [
        "/images/products/cray.png",
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
        "/images/products/cake.png",
      ],
      previews: [
        "/images/products/cake.png",
      ],
    },
  },
  // {
  //   title: "Unique Farms - Own Your Farm Investment",
  //   reviews: 0,
  //   price: 2000000.0,
  //   discountedPrice: 2000000.0,
  //   id: 17,
  //   imgs: {
  //     thumbnails: [
  //       "https://drive.google.com/uc?export=view&id=1dpTKdB9ze0ONlwahDzgkwcSznWiclx1D",
  //       "https://drive.google.com/uc?export=view&id=1dpTKdB9ze0ONlwahDzgkwcSznWiclx1D",
  //     ],
  //     previews: [
  //       "https://drive.google.com/uc?export=view&id=1dpTKdB9ze0ONlwahDzgkwcSznWiclx1D",
  //     ],
  //   },
  // },
  {
    title: "Fabrics Fusion - Fabrics",
    reviews: 0,
    price: 10000.0,
    discountedPrice: 1000.0,
    id: 18,
    imgs: {
      thumbnails: [
        "/images/products/fabric.png",
      ],
      previews: [
        "/images/products/fabric.png",
      ],
    },
  },
  // {
  //   title: "Solomorals Enterprises - Cocoyam Flour",
  //   reviews: 0,
  //   price: 1000.0,
  //   discountedPrice: 800.0,
  //   id: 19,
  //   imgs: {
  //     thumbnails: [
  //       "https://drive.google.com/uc?export=view&id=1hAB7D1E_cB90nshaKguZA0UJ2Pv2upJK",
  //       "https://drive.google.com/uc?export=view&id=1hAB7D1E_cB90nshaKguZA0UJ2Pv2upJK",
  //     ],
  //     previews: [
  //       "https://drive.google.com/uc?export=view&id=1hAB7D1E_cB90nshaKguZA0UJ2Pv2upJK",
  //     ],
  //   },
  // },
  // {
  //   title: "K•aced - Colorful Patterned & Customized Gadget Pouches",
  //   reviews: 0,
  //   price: 7000.0,
  //   discountedPrice: 5500.0,
  //   id: 20,
  //   imgs: {
  //     thumbnails: [
  //       "https://drive.google.com/uc?export=view&id=1JCb9xZdG8FaBKtTgoDR2IMr7STvlwCfD",
  //       "https://drive.google.com/uc?export=view&id=1py2jLziF37GS1J5lqOKIvkd1HnCKtzwX",
  //     ],
  //     previews: [
  //       "https://drive.google.com/uc?export=view&id=1JCb9xZdG8FaBKtTgoDR2IMr7STvlwCfD",
  //       "https://drive.google.com/uc?export=view&id=1py2jLziF37GS1J5lqOKIvkd1HnCKtzwX",
  //       "https://drive.google.com/uc?export=view&id=1-c_3ZuWfIZLEoASnMYFTXcETtVxhQ1vZ",
  //       "https://drive.google.com/uc?export=view&id=1acA5iisgoLRuS7P2JW-lfy-9qK1YfrOa",
  //       "https://drive.google.com/uc?export=view&id=1Mh4XoNQdgKLADFrFpysOleuM1ivme-sZ",
  //       "https://drive.google.com/uc?export=view&id=1EP8bfNAxr1KTaYrfK5EPykqfI1SHrrNp",
  //       "https://drive.google.com/uc?export=view&id=1vcWj9wIb9EaOs_zM2sty3Xq3_ClO6cEN",
  //       "https://drive.google.com/uc?export=view&id=1gHyRNbSPx5uk_XYvxS0-Vs5M5KaKCK0A",
  //       "https://drive.google.com/uc?export=view&id=1eGXKxEk-yNggkn_cgdX9TvepMSNDU7HW",
  //     ],
  //   },
  // },
  // {
  //   title: "Gombe Primary Health - Drugs and Consumables",
  //   reviews: 0,
  //   price: 700.0,
  //   discountedPrice: 560.0,
  //   id: 21,
  //   imgs: {
  //     thumbnails: [
  //       "https://drive.google.com/uc?export=view&id=1RA_aTzvfcoBslT0BkNXDlT_XcmNFo335",
  //       "https://drive.google.com/uc?export=view&id=1RA_aTzvfcoBslT0BkNXDlT_XcmNFo335",
  //     ],
  //     previews: [
  //       "https://drive.google.com/uc?export=view&id=1RA_aTzvfcoBslT0BkNXDlT_XcmNFo335",
  //     ],
  //   },
  // },
  // {
  //   title: "Eme Project Management - Construction Materials",
  //   reviews: 0,
  //   price: 120000.0,
  //   discountedPrice: 100000.0,
  //   id: 22,
  //   imgs: {
  //     thumbnails: [
  //       "https://drive.google.com/uc?export=view&id=1YTFPloH746T0u2jW--xtLbH1x6Z7Q0Uq",
  //       "https://drive.google.com/uc?export=view&id=1YTFPloH746T0u2jW--xtLbH1x6Z7Q0Uq",
  //     ],
  //     previews: [
  //       "https://drive.google.com/uc?export=view&id=1YTFPloH746T0u2jW--xtLbH1x6Z7Q0Uq",
  //     ],
  //   },
  // },
  {
    title: "Ajebo Fashion Success - Ready Made Female Clothes, Shoes, Bags",
    reviews: 0,
    price: 12000.0,
    discountedPrice: 9000.0,
    id: 23,
    imgs: {
      thumbnails: [
        "/images/products/w.png",
      ],
      previews: [
        "/images/products/w.png",
      ],
    },
  },
  // {
  //   title: "Tallest Mini Tetlow Electricals - Everything Electricals",
  //   reviews: 0,
  //   price: 6000.0,
  //   discountedPrice: 5000.0,
  //   id: 24,
  //   imgs: {
  //     thumbnails: [
  //       "https://drive.google.com/uc?export=view&id=1ZYfCKd6e2bO5OrD3v2J1rCYLBa2g8AGL",
  //       "https://drive.google.com/uc?export=view&id=1ZYfCKd6e2bO5OrD3v2J1rCYLBa2g8AGL",
  //     ],
  //     previews: [
  //       "https://drive.google.com/uc?export=view&id=1ZYfCKd6e2bO5OrD3v2J1rCYLBa2g8AGL",
  //     ],
  //   },
  // },
  {
    title: "Shop123k - Home and Kitchen Appliances",
    reviews: 0,
    price: 5000.0,
    discountedPrice: 3999.0,
    id: 25,
    imgs: {
      thumbnails: [
        "/images/products/pot.png",
      ],
      previews: [
        "/images/products/pot.png",
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
        "/images/products/img1.png",
      ],
      previews: [
        "/images/products/img2.png",
      ],
    },
  },
  // {
  //   title: "Nonso Enterprise - Night Wears",
  //   reviews: 0,
  //   price: 18000.0,
  //   discountedPrice: 15000.0,
  //   id: 27,
  //   imgs: {
  //     thumbnails: [
  //       "https://drive.google.com/uc?export=view&id=1RIJQia0JMQ1gqr-XWxmbuk4NiwQnALyZ",
  //       "https://drive.google.com/uc?export=view&id=1RIJQia0JMQ1gqr-XWxmbuk4NiwQnALyZ",
  //     ],
  //     previews: [
  //       "https://drive.google.com/uc?export=view&id=1RIJQia0JMQ1gqr-XWxmbuk4NiwQnALyZ",
  //     ],
  //   },
  // },
  {
    title: "T.GOD Investment - Oraimo 30,000mah Power Bank",
    reviews: 0,
    price: 35000.0,
    discountedPrice: 29000.0,
    id: 28,
    imgs: {
      thumbnails: [
        "/images/products/bank.png",
      ],
      previews: [
        "/images/products/bank.png",
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
        "/images/products/led.png",
      ],
      previews: [
        "/images/products/led.png",
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
        "/images/products/game.png",
      ],
      previews: [
        "/images/products/game.png",
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
    title: "Livy's Cup - Bottled Chapman",
    reviews: 0,
    price: 1500.0,
    discountedPrice: 1000.0,
    id: 32,
    imgs: {
      thumbnails: [
        "/images/products/bottle.png",
      ],
      previews: [
        "/images/products/bottle.png",
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
        "/images/products/6ml.png",
      ],
      previews: [
        "/images/products/6ml.png",
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
  // {
  //   title: "ELIM-BLISS PERFUME - 30ml",
  //   reviews: 0,
  //   price: 7000.0,
  //   discountedPrice: 6000.0,
  //   id: 8,
  //   imgs: {
  //     thumbnails: [
  //       "/images/products/30ml.png",
  //     ],
  //     previews: [
  //       "/images/products/30ml.png",
  //     ],
  //   },
  // },
  
  // {
  //   title: "Ibk Wine - Wines and Whiskey",
  //   reviews: 0,
  //   price: 15000.0,
  //   discountedPrice: 12000.0,
  //   id: 36,
  //   imgs: {
  //     thumbnails: [
  //       "/images/products/thrift.png",
  //     ],
  //     previews: [
  //       "/images/products/thrift.png",
  //     ],
  //   },
  // },
  {
    title: "ETZVERSATILE - iPhone 12 Pro Max",
    reviews: 0,
    price: 400000.0,
    discountedPrice: 350000.0,
    id: 37,
    imgs: {
      thumbnails: [
        "/images/products/pto.png",
      ],
      previews: [
        "/images/products/pto.png",
      ],    },
  },
  {
    title: "Ree'shairven - Closure Wigs",
    reviews: 0,
    price: 10000.0,
    discountedPrice: 7000.0,
    id: 38,
    imgs: {
      thumbnails: [
        "/images/products/wig.png",
      ],
      previews: [
        "/images/products/wig.png",
      ],
    },
  },
  // {
  //   title: "Benue Local Rice - 50kg",
  //   reviews: 0,
  //   price: 45000.0,
  //   discountedPrice: 40000.0,
  //   id: 39,
  //   imgs: {
  //     thumbnails: [
  //       "/images/products/thrift.png",
  //     ],
  //     previews: [
  //       "/images/products/thrift.png",
  //     ],
  //   },
  // },
  // {
  //   title: "Oic Ameke - Nigerian MBF Wood",
  //   reviews: 0,
  //   price: 35000.0,
  //   discountedPrice: 28000.0,
  //   id: 40,
  //   imgs: {
  //     thumbnails: [
  //       "/images/products/thrift.png",
  //     ],
  //     previews: [
  //       "/images/products/thrift.png",
  //     ],
  //   },
  // },
  {
    title: "Eko Explorers - Tourism Services",
    reviews: 0,
    price: 45000.0,
    discountedPrice: 35000.0,
    id: 41,
    imgs: {
      thumbnails: [
        "/images/products/tour.png",
      ],
      previews: [
        "/images/products/tour.png",
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
        "/images/products/oat.png",
      ],
      previews: [
        "/images/products/oat.png",
      ],
    },
  },
  // {
  //   title: "Blessed Designs - Vintage 3-yards Fabric",
  //   reviews: 0,
  //   price: 2500.0,
  //   discountedPrice: 1800.0,
  //   id: 43,
  //   imgs: {
  //     thumbnails: [
  //       "/images/products/thrift.png",
  //     ],
  //     previews: [
  //       "/images/products/thrift.png",
  //     ],
  //   },
  // },
  
  // {
  //   title: "Dara Jewelry Brand - Chunky Bracelet, Necklace, Earrings",
  //   reviews: 0,
  //   price: 10000.0,
  //   discountedPrice: 7000.0,
  //   id: 45,
  //   imgs: {
  //     thumbnails: [
  //       "/images/products/thrift.png",
  //     ],
  //     previews: [
  //       "/images/products/thrift.png",
  //     ],
  //   },
  // },
];

export default shopData;
