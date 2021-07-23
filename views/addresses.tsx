import React, { useContext, useEffect } from 'react';
import { View } from '@/library/types';
import AddressDescription from '@/components/descriptions/address-description';
import AddressEditModal from '@/components/address-edit-modal';
import DeleteItemModal from '@/components/delete-item-modal';
import { AddressTemplates } from '@/context/address-templates-query';
import TemplateMutation from '@/context/template-mutation';
import { isNone } from '@/library/helper';
import { Loading } from '@/components/loader';

interface AddressesView extends View { }

const AddressesPage: React.FC<AddressesView> = TemplateMutation<AddressesView>(({ deleteTemplate }) => {
  const { setLoading } = useContext(Loading);
  const { loading, templates, next, previous, load, loadMore, refetch } = useContext(AddressTemplates);

  const update = async (_?: React.MouseEvent) => refetch && await refetch();
  const remove = (id: string) => async () => {
    await deleteTemplate(id);
    update();
  };

  useEffect(() => { !loading && load() }, []);
  useEffect(() => { setLoading(loading); });

  return (
    <>

      <header className="px-2 pt-1 pb-4">
        <span className="title is-4">Addresses</span>
        <AddressEditModal className="button is-success is-pulled-right" onUpdate={update}>
          <span>New Address</span>
        </AddressEditModal>
      </header>

      {(templates?.length > 0) && <div className="table-container">
        <table className="table is-fullwidth">

          <tbody className="templates-table">
            <tr>
              <td className="is-size-7" colSpan={2}>ADDRESS TEMPLATES</td>
              <td className="action"></td>
            </tr>

            {templates.map((template) => (

              <tr key={`${template.id}-${Date.now()}`}>
                <td className="template">
                  <p className="is-subtitle is-size-6 my-1 has-text-weight-semibold">{template.label}</p>
                  <AddressDescription address={template.address} />
                </td>
                <td className="default is-vcentered">
                  {template.is_default && <span className="is-size-7 has-text-weight-semibold">
                    <span className="icon has-text-success"><i className="fas fa-check"></i></span> Default shipper address
                  </span>}
                </td>
                <td className="action is-vcentered">
                  <div className="buttons is-centered">
                    <AddressEditModal className="button is-white" addressTemplate={template} onUpdate={update}>
                      <span className="icon is-small">
                        <i className="fas fa-pen"></i>
                      </span>
                    </AddressEditModal>
                    <DeleteItemModal label="Address Template" identifier={template.id} onConfirm={remove(template.id)}>
                      <span className="icon is-small">
                        <i className="fas fa-trash"></i>
                      </span>
                    </DeleteItemModal>
                  </div>
                </td>
              </tr>

            ))}
          </tbody>

        </table>

        <footer className="px-2 py-2 is-vcentered">
          <span className="is-size-7 has-text-weight-semibold">{templates.length} results</span>

          <div className="buttons has-addons is-centered is-pulled-right">
            <button className="button is-small" onClick={() => loadMore(previous)} disabled={isNone(previous)}>
              <span>Previous</span>
            </button>
            <button className="button is-small" onClick={() => loadMore(next)} disabled={isNone(next)}>
              <span>Next</span>
            </button>
          </div>
        </footer>
        
      </div>}

      {(!loading && templates?.length == 0) && <div className="card my-6">

        <div className="card-content has-text-centered">
          <p>No address has been added yet.</p>
          <p>Use the <strong>New Address</strong> button above to add</p>
        </div>

      </div>}

    </>
  );
});

export default AddressesPage;