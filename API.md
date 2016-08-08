<a name="TypeDefinition"></a>

# TypeDefinition
Parameter type filtering definition.

**Kind**: global class  

* [TypeDefinition](#TypeDefinition)
    * [new TypeDefinition(type, [value], [count])](#new_TypeDefinition_new)
    * [.match(values)](#TypeDefinition+match) ⇒ <code>Array</code>

<a name="new_TypeDefinition_new"></a>

## new TypeDefinition(type, [value], [count])
Constructs a new type definition.

**Throws**:

- <code>TypeError</code> Whenever count is not a number.
- <code>TypeError</code> Whenever value is given and wrongly typed.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>\*</code> |  | The type to match parameters against. |
| [value] | <code>\*</code> |  | The default value for optional parameters. |
| [count] | <code>Number</code> | <code>1</code> | The number of values to match. |

<a name="TypeDefinition+match"></a>

## typeDefinition.match(values) ⇒ <code>Array</code>
Matches a list of values against the definition.

**Kind**: instance method of <code>[TypeDefinition](#TypeDefinition)</code>  
**Returns**: <code>Array</code> - The matched or default values.  
**Throws**:

- <code>TypeError</code> Whenever matching cannot fulfill the definition.


| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array</code> | The list of values to match agains the definition. |

