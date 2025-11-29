import { Product } from "@/types/product";
const shopData: Product[] = [
  {
    title: "Golden Penny Spaghetti",
    reviews: 15,
    price: 55799.0,
    discountedPrice: 25799.0,
    id: 1,
    imgs: {
      thumbnails: [
        "/images/products/product-1-bg-1.png",
        "/images/products/product-1-bg-1.png",
      ],
      previews: [
        "/images/products/product-1-bg-1.png",
        "/images/products/product-1-bg-1.png",
      ],
    },
  },
  {
    title: "Dangote Refined Sugar",
    reviews: 5,
    price: 89999.0,
    discountedPrice: 59999.0,
    id: 2,
    imgs: {
      thumbnails: [
        "/images/products/product-2-bg-1.png",
        "/images/products/product-2-bg-1.png",
      ],
      previews: [
        "/images/products/product-2-bg-1.png",
        "/images/products/product-2-bg-1.png",
      ],
    },
  },
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
        "https://drive.google.com/uc?export=view&id=1V9sPcgjBTrkBTvcTDAjPS_m4pcG7XM7C",
        "https://drive.google.com/uc?export=view&id=1V9sPcgjBTrkBTvcTDAjPS_m4pcG7XM7C",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1V9sPcgjBTrkBTvcTDAjPS_m4pcG7XM7C",
        "https://drive.google.com/uc?export=view&id=1V9sPcgjBTrkBTvcTDAjPS_m4pcG7XM7C",
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
        "https://drive.google.com/uc?export=view&id=1UHcAPOIdjxAmNLnuoi7Ukvkk2TrvT5Zb",
        "https://drive.google.com/uc?export=view&id=1XF4BW3bsS6Srvsx6ENK0XiHcWROvfyy5",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1UHcAPOIdjxAmNLnuoi7Ukvkk2TrvT5Zb",
        "https://drive.google.com/uc?export=view&id=1XF4BW3bsS6Srvsx6ENK0XiHcWROvfyy5",
        "https://drive.google.com/uc?export=view&id=10bC-hEkymI83KgP4maWySzuddiZ0TzVj",
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
        "https://drive.google.com/uc?export=view&id=10gVRT0YYUxQlb6OOO5h29b7JgxmYkCNP",
        "https://drive.google.com/uc?export=view&id=1TP88J985JKIGhwbcbVOKah1u0AMSmUn_",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=10gVRT0YYUxQlb6OOO5h29b7JgxmYkCNP",
        "https://drive.google.com/uc?export=view&id=1TP88J985JKIGhwbcbVOKah1u0AMSmUn_",
        "https://drive.google.com/uc?export=view&id=1aSWbTH63knWfVTSd2gShy1H56uGXfsol",
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
        "https://drive.google.com/uc?export=view&id=1aSWbTH63knWfVTSd2gShy1H56uGXfsol",
        "https://drive.google.com/uc?export=view&id=1UHcAPOIdjxAmNLnuoi7Ukvkk2TrvT5Zb",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1aSWbTH63knWfVTSd2gShy1H56uGXfsol",
        "https://drive.google.com/uc?export=view&id=1UHcAPOIdjxAmNLnuoi7Ukvkk2TrvT5Zb",
        "https://drive.google.com/uc?export=view&id=1XF4BW3bsS6Srvsx6ENK0XiHcWROvfyy5",
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
        "https://drive.google.com/uc?export=view&id=1AeBzAeqscL0QDOfgIxpNfwgkdAg8jSyP",
        "https://drive.google.com/uc?export=view&id=1AeBzAeqscL0QDOfgIxpNfwgkdAg8jSyP",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=1AeBzAeqscL0QDOfgIxpNfwgkdAg8jSyP",
        "https://drive.google.com/uc?export=view&id=10bC-hEkymI83KgP4maWySzuddiZ0TzVj",
        "https://drive.google.com/uc?export=view&id=10gVRT0YYUxQlb6OOO5h29b7JgxmYkCNP",
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
        "https://drive.google.com/uc?export=view&id=176F0sGhx-MAxvpLQPB7-p0bmnWeYjK6Z",
        "https://drive.google.com/uc?export=view&id=1nEfqXsJ1dlt8cXXQbklH-j34SEQKK8dv",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=176F0sGhx-MAxvpLQPB7-p0bmnWeYjK6Z",
        "https://drive.google.com/uc?export=view&id=1nEfqXsJ1dlt8cXXQbklH-j34SEQKK8dv",
        "https://drive.google.com/uc?export=view&id=1iuBEQ5TaPTzZyJB5KlYDvvJw_Gs9svBG",
        "https://drive.google.com/uc?export=view&id=1rhdtgu4lh5Hy5qpK-2wcvI0tydBpq8dP",
        "https://drive.google.com/uc?export=view&id=1TJHXTZPWq2Tr8kFqGV7Fr0LPsEl0l6V3",
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
        "https://drive.google.com/uc?export=view&id=17EaZKpBW1gWj6P2rSqG2NeqjcG4KokTE",
        "https://drive.google.com/uc?export=view&id=1X38fYBtMev1YtjF1MqXQYTXUZ-t_iPuB",
      ],
      previews: [
        "https://drive.google.com/uc?export=view&id=17EaZKpBW1gWj6P2rSqG2NeqjcG4KokTE",
        "https://drive.google.com/uc?export=view&id=1X38fYBtMev1YtjF1MqXQYTXUZ-t_iPuB",
        "https://drive.google.com/uc?export=view&id=1PIlxyLaRaf4o1bbzKjlxXaDPbNJmJ9ge",
        "https://drive.google.com/uc?export=view&id=1IPkO-Ae6SbF-FN0lKv58NvbCL7uNFx10",
        "https://drive.google.com/uc?export=view&id=1glHUkWIlfqrisluMi2VJ_Ac95VTTQiYc",
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
];

export default shopData;
