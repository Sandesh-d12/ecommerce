// import React from "react";
// import { render } from "react-dom";
// import Downshift from "downshift";
// import { Formik } from "formik";
// import "./Dropdown.css";
// import classNames from "classnames";

// function Dropdown({ items, ...rest }) {
//   return (
//     <Downshift {...rest}>
//       {({
//         getLabelProps,
//         getInputProps,
//         getButtonProps,
//         getItemProps,
//         isOpen,
//         toggleMenu,
//         clearSelection,
//         selectedItem,
//         inputValue,
//         highlightedIndex,
//         itemToString
//       }) => (
//         <div
//           style={{
//             width: 250,
//             margin: "auto",
//             display: "flex",
//             flexDirection: "column"
//           }}
//         >
//           <div className="Dropdown__inputWrapper" onClick={toggleMenu}>
//             <div
//               className={classNames("Dropdown__inputField", {
//                 "Dropdown__inputField--placeholder": !selectedItem
//               })}
//               style={{ display: "block", flex: 1, textAlign: "left" }}
//             >
//               {inputValue ? inputValue : "Select an item"}
//             </div>
//             <button
//               id="my-select"
//               type="button"
//               className="Dropdown__toggleMenuButton"
//               data-toggle="dropdown"
//               aria-haspopup="true"
//               aria-expanded={isOpen}
//             >
//               <ChevronDown up={isOpen} />
//               <span className="sr-only">Toggle Dropdown</span>
//             </button>
//           </div>
//           {isOpen ? (
//             <div className="Dropdown__menu">
//               {items.map(item => (
//                 <button
//                   {...getItemProps({ item })}
//                   key={item.id}
//                   className="Dropdown__menuItem"
//                   style={{ cursor: "pointer" }}
//                 >
//                   {itemToString(item)}
//                 </button>
//               ))}
//             </div>
//           ) : null}
//         </div>
//       )}
//     </Downshift>
//   );
// }

// const ChevronDown = ({ up }) => (
//   <div
//     className={classNames("ChevronDown__container", {
//       "ChevronDown__container--up": up
//     })}
//   >
//     <div className="ChevronDown" />
//   </div>
// );

// class App extends React.Component {
//   items = [{ text: "esewa", id: 1 }, { text: "paypal", id: 2 }, { text: "cash on delivery", id: 3 }, { text: "khalti", id: 4 }];
//   state = {
//     selectedItem: ""
//   };
//   render() {
//     return (
//       <div
//         style={{
//           marginTop: 50,
//           display: "flex",
//           justifyContent: "center",
//           flexDirection: "column",
//           textAlign: "center"
//         }}
//       >
//         {this.state.selectedItem.text}

//         <Formik
//           initialValues={{
//             fruit: { id: 1, text: "Apple" }
//           }}
//           onSubmit={(
//             values,
//             { setSubmitting, setErrors /* setValues and other goodies */ }
//           ) => {
//             console.log(values);
//             setSubmitting(false);
//           }}
//           render={({
//             values,
//             errors,
//             touched,
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             isSubmitting,
//             setFieldValue,
//             submitForm
//           }) => (
//             <form onSubmit={handleSubmit}>
//               <Dropdown
//                 itemToString={item => item.text}
//                 items={this.items}
//                 value={values.fruit}
//                 selectedItem={this.state.selectedItem}
//                 onChange={item => {
//                   console.log(item);
//                   setFieldValue("fruit", item);
//                 }}
//               />
//               <button type="submit" disabled={isSubmitting}>
//                 Submit
//               </button>
//             </form>
//           )}
//         />
//       </div>
//     );
//   }
// }

// render(<App />, document.getElementById("root"));
