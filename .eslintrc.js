module.exports = {
    root: true,
    env: {
      node: true,
      es6: true,
    },
    globals: {
      defineProps: "readonly",
      defineEmits: "readonly",
      defineExpose: "readonly",
      withDefaults: "readonly",
    },
    extends: ["plugin:vue/vue3-recommended", "eslint:recommended"],
    parserOptions: {
      parser: "babel-eslint",
    },
    rules: {
      "no-console":"off",
      "no-debugger": "off",
      "semi": ["error", "always" ],
      "no-extra-semi": "error",        
      "comma-style": ["error", "last" ],        
      "comma-spacing": ["error", { "before": false, "after": true } ],
      "comma-dangle": ["error", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "never", 
      }],        
      "quotes": ["error", "double"],
      "padded-blocks": ["error", "never"],        
      
    },
  };
  