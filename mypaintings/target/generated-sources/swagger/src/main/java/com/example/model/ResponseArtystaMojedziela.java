package com.example.model;

import java.util.Objects;
import com.example.model.ResponseArtystaMojedzielaDziela;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.ArrayList;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseArtystaMojedziela
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-28T06:59:25.623324300+02:00[Europe/Warsaw]")


public class ResponseArtystaMojedziela   {
  @JsonProperty("dziela")
  @Valid
  private List<ResponseArtystaMojedzielaDziela> dziela = null;

  public ResponseArtystaMojedziela dziela(List<ResponseArtystaMojedzielaDziela> dziela) {
    this.dziela = dziela;
    return this;
  }

  public ResponseArtystaMojedziela addDzielaItem(ResponseArtystaMojedzielaDziela dzielaItem) {
    if (this.dziela == null) {
      this.dziela = new ArrayList<>();
    }
    this.dziela.add(dzielaItem);
    return this;
  }

  /**
   * Get dziela
   * @return dziela
   **/
  @Schema(description = "")
      @Valid
    public List<ResponseArtystaMojedzielaDziela> getDziela() {
    return dziela;
  }

  public void setDziela(List<ResponseArtystaMojedzielaDziela> dziela) {
    this.dziela = dziela;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseArtystaMojedziela responseArtystaMojedziela = (ResponseArtystaMojedziela) o;
    return Objects.equals(this.dziela, responseArtystaMojedziela.dziela);
  }

  @Override
  public int hashCode() {
    return Objects.hash(dziela);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseArtystaMojedziela {\n");
    
    sb.append("    dziela: ").append(toIndentedString(dziela)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
