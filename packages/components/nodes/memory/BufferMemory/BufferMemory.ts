import { INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses } from '../../../src/utils'

class BufferMemory_Memory implements INode {
    label: string
    name: string
    description: string
    type: string
    icon: string
    category: string
    baseClasses: string[]
    inputs: INodeParams[]

    constructor() {
        this.label = 'Buffer Memory'
        this.name = 'bufferMemory'
        this.type = 'BufferMemory'
        this.icon = 'memory.svg'
        this.category = 'Memory'
        this.description = 'Perform calculations on response'
        this.inputs = [
            {
                label: 'Memory Key',
                name: 'memoryKey',
                type: 'string',
                default: 'chat_history'
            },
            {
                label: 'Input Key',
                name: 'inputKey',
                type: 'string',
                default: 'input'
            }
        ]
    }

    async getBaseClasses(): Promise<string[]> {
        const { BufferMemory } = await import('langchain/memory')
        return getBaseClasses(BufferMemory)
    }

    async init(nodeData: INodeData): Promise<any> {
        const { BufferMemory } = await import('langchain/memory')
        const memoryKey = nodeData.inputs?.memoryKey as string
        const inputKey = nodeData.inputs?.inputKey as string
        return new BufferMemory({
            returnMessages: true,
            memoryKey,
            inputKey
        })
    }
}

module.exports = { nodeClass: BufferMemory_Memory }