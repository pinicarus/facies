# Classes

<dl>
<dt><a href="#TypeDefinition">TypeDefinition</a></dt>
<dd><p>A parameter type filtering definition.</p>
</dd>
</dl>

# Functions

<dl>
<dt><a href="#match">match(values, definitions, [strict])</a> ⇒ <code>Array.&lt;*&gt;</code></dt>
<dd><p>Filters optional and required parameters.
Missing optional parameters will be replaced by `undefined&#39;.</p>
</dd>
</dl>

# Typedefs

<dl>
<dt><a href="#Iterable">Iterable</a> : <code>Object</code></dt>
<dd><p>An iterable object</p>
</dd>
</dl>

<a name="TypeDefinition"></a>

# TypeDefinition
A parameter type filtering definition.

**Kind**: global class  
<a name="new_TypeDefinition_new"></a>

## new TypeDefinition(type, [value], [count])
Constructs a new type definition.

**Throws**:

- <code>TypeError</code> Whenever count is not a positive number.
- <code>TypeError</code> Whenever value is given and wrongly typed.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>\*</code> |  | The type to match parameters against. |
| [value] | <code>\*</code> | <code></code> | The default value for optional parameters. |
| [count] | <code>Number</code> | <code>1</code> | The number of values to match. |

<a name="match"></a>

# match(values, definitions, [strict]) ⇒ <code>Array.&lt;\*&gt;</code>
Filters optional and required parameters.
Missing optional parameters will be replaced by `undefined'.

**Kind**: global function  
**Returns**: <code>Array.&lt;\*&gt;</code> - The filtered values.  
**Throws**:

- <code>TypeError</code> Whenever a required parameter is missing.
- <code>TypeError</code> Whenever a required parameter has the wrong type.
- <code>TypeError</code> Whenever there are pending values with strict filter.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| values | <code>[Iterable](#Iterable)</code> |  | The values to filter. |
| definitions | <code>[Array.&lt;TypeDefinition&gt;](#TypeDefinition)</code> |  | The type definitions to filter with. |
| [strict] | <code>Boolean</code> | <code>false</code> | Whether all values have to be filtered. |

<a name="Iterable"></a>

# Iterable : <code>Object</code>
An iterable object

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| @@iterator | <code>function</code> | The function returning an iterator over the iterable. |

