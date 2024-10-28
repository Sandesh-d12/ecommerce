// import React from "react";

// const lazyLoader = (importComp) => {
//   return class extends React.Component {
//     // state: {
//     //   component: null,
//     // };

//     componentDidMount() {
//       importComp().then((comp) => setState({ component: comp.default }));
//     }

//     render() {
//       const C = this.state.component;
//       return C ? <C {...this.props} /> : null;
//     }
//   };
// };
// export default lazyLoader;
