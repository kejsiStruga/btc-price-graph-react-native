/**
 * 
 * Supressing Flow complainings for 'not finding' react-native and ReactNativeART library 
 */
declare module 'react-native' {
    declare module.exports: any;
}

declare module 'react-native/Libraries/ART/ReactNativeART' {
    declare module.exports: any;
}