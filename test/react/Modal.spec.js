import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import Modal from '../../src/components/Modal';

describe('Modal', () => {

	const MODAL_MESSAGE = 'Message';
	test('standard modal', ()=>{
		const modal = new ReactWrapper(mount(<Modal show={true} size='small'>
								<Modal.Header><Modal.Title>Standard Modal</Modal.Title></Modal.Header>
								<Modal.Body>
									{MODAL_MESSAGE}
								</Modal.Body>
								<Modal.Footer actionButtonText='Yes' actionButtonClick={()=>{}}/>
							</Modal>).instance().modalRef, true);

		expect(modal.find(Modal.Body).length).toBe(1);                                                                               
		expect(modal.find(Modal.Header).length).toBe(1);                                                                               
		expect(modal.find(Modal.Title).length).toBe(1);   
		expect(modal.find(Modal.Body).length).toBe(1);              
		expect(modal.find(Modal.Footer).length).toBe(1); 
		expect(modal.find(Modal.Header).props().type).toBe('info');
		expect(modal.find(Modal.Body).text()).toBe(MODAL_MESSAGE);
		expect(modal.html()).toMatchSnapshot();
	});
	
	test('standard modal - not displayed', ()=>{
		const modal = new ReactWrapper(mount(<Modal show={false} size='small'>
								<Modal.Header><Modal.Title>Standard Modal</Modal.Title></Modal.Header>
								<Modal.Body>
									 {MODAL_MESSAGE}	
								</Modal.Body>
								<Modal.Footer actionButtonText='Yes' actionButtonClick={()=>{}}/>
							</Modal>).instance().modalRef, true);		
		expect(modal.find(Modal.Body).length).toBe(0);
		expect(modal.html()).toMatchSnapshot();        
	});
	
	test('alert modal', ()=>{
		const modal = new ReactWrapper(mount(
			<Modal show type='alert' size='small'>
				<Modal.Header type='alert'><Modal.Title>Title</Modal.Title></Modal.Header>
				<Modal.Body>
					{MODAL_MESSAGE}
				</Modal.Body>
				<Modal.Footer closeButtonText='Ok'/>
		</Modal>).instance().modalRef, true);
		expect(modal.find(Modal.Body).text()).toBe(MODAL_MESSAGE);
		expect(modal.find('.sdc-modal-type-alert').length).toBe(1);
		expect(modal.html()).toMatchSnapshot();
	});
	
	test('custom modal', ()=>{
		const modal = new ReactWrapper(mount(
			<Modal show type='custom'>
				<Modal.Header type='custom'><Modal.Title>Title</Modal.Title></Modal.Header>
				<Modal.Body>
					{MODAL_MESSAGE}
				</Modal.Body>
				<Modal.Footer  actionButtonText='Ok' actionButtonClick={()=>{}}/>
			</Modal>).instance().modalRef, true);
		expect(modal.find(Modal.Body).text()).toBe(MODAL_MESSAGE);
		expect(modal.find('.sdc-modal-type-custom').length).toBe(1);
		expect(modal.html()).toMatchSnapshot();
	});

});

describe('Modal - dialog semantics', () => {
	const dialogOf = modal => new ReactWrapper(modal.instance().modalRef, true).find('.sdc-modal__wrapper');

	test('the wrapper is a modal dialog labelled by its title', () => {
		const modal = mount(<Modal show>
			<Modal.Header onClose={() => {}}><Modal.Title>Standard Modal</Modal.Title></Modal.Header>
			<Modal.Body>body</Modal.Body>
		</Modal>);
		const dialog = dialogOf(modal);
		expect(dialog.prop('role')).toBe('dialog');
		expect(dialog.prop('aria-modal')).toBe('true');
		const titleId = dialog.prop('aria-labelledby');
		expect(document.getElementById(titleId).textContent).toBe('Standard Modal');
		modal.unmount();
	});

	test('Escape calls onClose only while shown', () => {
		const onClose = jest.fn();
		const modal = mount(<Modal show onClose={onClose}><Modal.Body>body</Modal.Body></Modal>);
		document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
		expect(onClose).toHaveBeenCalledTimes(1);
		modal.setProps({show: false});
		document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
		expect(onClose).toHaveBeenCalledTimes(1);
		modal.unmount();
	});

	test('focus moves into the dialog on open and back on close', () => {
		const opener = document.createElement('button');
		document.body.appendChild(opener);
		opener.focus();
		const modal = mount(<Modal show={false}><Modal.Body>body</Modal.Body></Modal>);
		modal.setProps({show: true});
		expect(document.activeElement.getAttribute('role')).toBe('dialog');
		modal.setProps({show: false});
		expect(document.activeElement).toBe(opener);
		modal.unmount();
		document.body.removeChild(opener);
	});
});
