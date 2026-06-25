// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const ScrollToTop = () => {
//     const { pathname } = useLocation();

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, [pathname]); // أول ما المسار يتغير، هيطلع فوق أوتوماتيك

//     return null;
// };

// export default ScrollToTop;


import { useLayoutEffect } from "react"; // استبدلها هنا
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
