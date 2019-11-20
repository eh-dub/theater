<script>
import {flip} from 'svelte/animate';
import {quintInOut} from 'svelte/easing';

export let products = [];
</script>

<table style="margin: 0 auto; font-size: 2rem; text-align: right">
  <tbody>
    <tr>
      <th>id</th>
      <th>rank</th>
    </tr>

    {#each products as p (p.id)}
      <tr class="product-row" animate:flip="{{easing: quintInOut}}" >
        <td>{p.id}</td>
        <td>
          {#if p.rank}
            <span class="product-rank"
            >{p.rank}</span>
          {/if}
        </td>
      </tr>
    {/each}

  </tbody>
</table>