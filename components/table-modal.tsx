import React, {useState, useEffect, useRef} from 'react';
import Modal from 'react-modal';

const MODAL_STYLE = {
	content: {
		top: '80px',
		padding: '5px',
		background: '#71797E'
	}
};

export default function TableModal({ tableModalIsOpen, setTableModalIsOpen, tableModalContent }) {
	function afterOpenModal() {
	// references are now sync'd and can be accessed.
	// subtitle.style.color = '#f00';
	}
	
	function closeModal() {
		setTableModalIsOpen(false);
	}

	return (
		<div>
			<Modal
				isOpen={ tableModalIsOpen }
				onAfterOpen={ afterOpenModal }
				onRequestClose={ closeModal }
				style={ MODAL_STYLE }
				contentLabel="Collection Modal"
			>
				<div className={ `w_100 h_100 flex_col overflow_auto` }>
					<div className={ `w_100 flex_row flex_end` }>
						<button
							className={ `table_modal_close_btn` }
							onClick={ closeModal }
						>
							X
						</button>
					</div>
					{/* Text content */}
					{
						tableModalContent && Object.keys(tableModalContent).map((key) => {
							return (
								<div className={ `w_100 flex_row flex_center mb_1` }>
									<div className={ `flex_col pr_2` } style={ { width:'40%', justifyContent:'center', alignItems:'end' } }>
										<h4 style={ { color:'white' } }>{ key }:</h4>
									</div>
									<div className={ `flex_col` } style={ { width:'40%', justifyContent:'center' } }>
										<h5 style={ { color:'white' } }>{ tableModalContent[key] }</h5>
									</div>
								</div>
							);
						})
					}
					{/* Image content */}
					<div className={ `w_100 flex_row flex_center mt-2` }>
						<h3>Images</h3>
					</div>
					<h3 className={ `w_100 flex_row flex_center` }>
						Image A
					</h3>
					<h3 className={ `w_100 flex_row flex_center` }>
						Image B
					</h3>
					<h3 className={ `w_100 flex_row flex_center` }>
						Image C
					</h3>
				</div>
			</Modal>
		</div>
	);
}
