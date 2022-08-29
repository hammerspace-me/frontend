import { FC } from 'react';
import { useApi } from '../actions/api-factory';
import { IBackpackItem, useStore } from '../store';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useBackpackActions } from '../actions/backpackActions';
import Button from './Button';

type FormData = {
  id: string;
  content: string;
  category: string;
  source: string;
  metadata: any;
};

const BackpackItemForm: FC = () => {
  const [store] = useStore();
  const { id } = useParams<'id'>();
  const { getBackpack, deleteBackpackItem } = useBackpackActions();

  const backpackItem = store.backpack?.backpackItems.find((item) => item.id === id);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      id: backpackItem?.id,
      content: backpackItem?.content,
      source: backpackItem?.source,
      category: backpackItem?.category,
      metadata: backpackItem?.metadata
    }
  });

  const { api } = useApi(store.accessToken);
  const navigate = useNavigate();

  const onSubmit = async (data: IBackpackItem) => {
    const mode = id == null ? 'create' : 'edit';

    if (mode === 'create') {
      await api.post('/backpack/item', data);
      await getBackpack();
      navigate('/');
    } else {
      await api.post('/backpack/item/' + data.id, data);
      await getBackpack();
      navigate('/');
    }
  };

  const onDelete = async (id: string) => {
    await deleteBackpackItem(id);
    getBackpack();
    navigate('/');
  };

  const errorMessages = {
    pattern: 'Do not use any special charcters.',
    required: 'Do not leave empty.'
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6">
          <label className="block text-sm font-medium text-gray-700">Backpack address</label>
          <input
            type="text"
            name="backpackAddress"
            id="backpackAddress"
            disabled
            className="mt-1 focus:ring-black focus:border-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={store.backpack?.id}></input>
          <p className="mt-2 text-sm text-gray-500">Backpack address is automatically added.</p>
        </div>
        <div className="col-span-6 sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Content (CID)</label>
          <input
            type="text"
            className="mt-1 focus:ring-black focus:border-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            disabled={id != null}
            {...register('content', {
              required: true
            })}></input>
          {id != null ? (
            <p className="mt-2 text-sm text-gray-500">Content (CID) can not be changed.</p>
          ) : (
            <></>
          )}
          <p className="mt-2 text-sm text-red-500">
            {errors.content?.type === 'pattern' && errorMessages.pattern}
            {errors.content?.type === 'required' && errorMessages.required}
          </p>
        </div>
        <div className="col-span-6 sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            className="mt-1 focus:ring-black focus:border-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            {...register('category', {
              required: true
            })}>
            <option value="avatar">Avatar</option>
            <option value="identity">Identity</option>
            <option value="misc">Misc</option>
          </select>
          <p className="mt-2 text-sm text-red-500">
            {errors.category?.type === 'required' && errorMessages.required}
          </p>
        </div>
        <div className="col-span-6 sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Source</label>
          <input
            type="text"
            className="mt-1 focus:ring-black focus:border-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            {...register('source', { required: true })}></input>
          <p className="mt-2 text-sm text-red-500">
            {errors.source?.type === 'required' && errorMessages.required}
          </p>
        </div>
        <div className="col-span-6 sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Metadata</label>
          <p className="bg-gray">{JSON.stringify(backpackItem?.metadata)}</p>
          <p className="mt-2 text-sm text-red-500">
            {errors.source?.type === 'required' && errorMessages.required}
          </p>
        </div>
        <Button>Save</Button>
        <Button onClick={() => navigate('/')} className="bg-gray-400">
          Cancel
        </Button>
        {id ? (
          <Button className="bg-red-600" onClick={() => onDelete(id)}>
            Delete
          </Button>
        ) : (
          <></>
        )}
      </div>
    </form>
  );
};

export default BackpackItemForm;
