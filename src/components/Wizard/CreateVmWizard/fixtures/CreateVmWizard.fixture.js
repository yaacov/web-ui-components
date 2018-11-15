import { CreateVmWizard } from '..';
import { networkConfigs, templates } from '../../../../constants';
import { ProcessedTemplatesModel } from '../../../../models';

export const namespaces = [
  {
    metadata: {
      name: 'default',
    },
  },
  {
    metadata: {
      name: 'myproject',
    },
  },
];

export const storageClasses = [
  {
    metadata: {
      name: 'nfs',
    },
  },
  {
    metadata: {
      name: 'iscsi',
    },
  },
  {
    metadata: {
      name: 'glusterfs',
    },
  },
  {
    metadata: {
      name: 'azuredisk',
    },
  },
];

export const persistentVolumeClaims = [
  {
    metadata: {
      // should be the same namespaces as the vm
      name: 'disk-one',
      namespace: 'default',
    },
    spec: {
      resources: {
        requests: {
          storage: '10gi',
        },
      },
      storageClassName: 'nfs',
    },
  },
  {
    metadata: {
      name: 'disk-two',
      namespace: 'myproject',
    },
    spec: {
      resources: {
        requests: {
          storage: '15gi',
        },
      },
      storageClassName: 'glusterfs',
    },
  },
  {
    metadata: {
      name: 'disk-three',
      namespace: 'default',
    },
    spec: {
      resources: {
        requests: {
          storage: '20gi',
        },
      },
      storageClassName: 'iscsi',
    },
  },
];

const processTemplate = template =>
  new Promise((resolve, reject) => {
    const nameParam = template.parameters.find(param => param.name === 'NAME');
    template.objects[0].metadata.name = nameParam.value;
    resolve(template);
  });

export const k8sCreate = (model, resource) => {
  if (model === ProcessedTemplatesModel) {
    return processTemplate(resource);
  }
  return new Promise(resolve => resolve(resource));
};
export const units = { dehumanize: val => ({ value: val ? val.match(/^[0-9]+/)[0] * 1073741824 : 0 }) };

export default [
  {
    component: CreateVmWizard,
    name: 'namespaces',
    props: {
      onHide: () => {},
      templates,
      namespaces,
      k8sCreate,
      networkConfigs,
      persistentVolumeClaims,
      storageClasses,
      units,
    },
  },
  {
    component: CreateVmWizard,
    name: 'selected namespace',
    props: {
      onHide: () => {},
      templates,
      namespaces,
      selectedNamespace: namespaces[1],
      k8sCreate,
      networkConfigs,
      persistentVolumeClaims,
      storageClasses,
      units,
    },
  },
  {
    component: CreateVmWizard,
    name: 'loading',
    props: {
      onHide: () => {},
      templates: null,
      namespaces: null,
      k8sCreate,
      networkConfigs: null,
      persistentVolumeClaims: null,
      storageClasses: null,
      units,
    },
  },
];
