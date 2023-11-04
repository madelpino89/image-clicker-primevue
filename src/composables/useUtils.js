
const useUtils = () => { 
    const capitalizeGender = gender => gender.charAt(0).toUpperCase() + gender.slice(1);
    return {
        capitalizeGender,
    };
};
export default useUtils;