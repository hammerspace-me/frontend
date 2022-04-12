import { FC } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useApi } from '../actions/api-factory';
import { IBackpackItem, useStore } from '../store';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

type FormData = {
  content: string;
  category: string;
  source: string;
};

const BackpackItemForm: FC = () => {
  const [store] = useStore();
  const { id } = useParams<'id'>();

  const backpackItem = store.backpack?.backpackItems.find((item) => item.content === id);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      content: backpackItem?.content,
      source: backpackItem?.source,
      category: backpackItem?.category
    }
  });

  const { api } = useApi(store.accessToken);
  const navigate = useNavigate();

  const onSubmit = async (data: IBackpackItem) => {
    const mode = id == null ? 'create' : 'edit';

    if (mode === 'create') {
      await api.post('/backpack/item', data);
      navigate('/');
    } else {
      await api.post('/backpack/item/' + data.content, data);
      navigate('/');
    }
  };

  const errorMessages = {
    pattern: 'Do not use any special charcters.',
    required: 'Do not leave empty.'
  };

  return (
    <>
      <Col>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Backpack address</Form.Label>
            <Form.Control type="text" disabled value={store.backpack?.id} />
            <Form.Text className="text-muted">
              Your backpack address is automatically added.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="text"
              disabled={id != null}
              placeholder="Content"
              isInvalid={errors.content != null}
              {...register('content', {
                required: true,
                pattern: /^[A-Za-z0-9]+$/i
              })}
            />
            {id != null ? (
              <Form.Text className="text-muted">Content (CID) can not be changed.</Form.Text>
            ) : (
              <></>
            )}
            <Form.Control.Feedback type="invalid">
              {errors.content?.type === 'pattern' && errorMessages.pattern}
              {errors.content?.type === 'required' && errorMessages.required}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select
              aria-label="category select"
              {...register('category', { required: true })}
              isInvalid={errors.category != null}>
              <option value="avatar">Avatar</option>
              <option value="identity">Identity</option>
              <option value="misc">Misc</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.category?.type === 'required' && errorMessages.required}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="source">
            <Form.Label>Source</Form.Label>
            <Form.Control
              type="text"
              placeholder="Source"
              {...register('source', { required: true })}
              isInvalid={errors.source != null}
            />
            <Form.Control.Feedback type="invalid">
              {errors.source?.type === 'required' && errorMessages.required}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Col>
    </>
  );
};

export default BackpackItemForm;
